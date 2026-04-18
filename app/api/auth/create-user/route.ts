// app/api/auth/create-user/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("[CREATE-USER API] Initialization check:", {
  hasUrl: !!supabaseUrl,
  hasServiceKey: !!serviceRoleKey,
  urlValue: supabaseUrl ? supabaseUrl.substring(0, 20) + "..." : "NOT SET",
  keyLength: serviceRoleKey ? serviceRoleKey.length : 0,
});

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
}

// Create a Supabase client with the SERVICE ROLE KEY (bypasses RLS)
// If not available, we'll handle it gracefully
const supabaseAdmin = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

console.log("[CREATE-USER API] Supabase admin client created:", {
  initialized: !!supabaseAdmin,
});

interface CreateUserRequest {
  id: string;
  email: string;
  name: string;
}

export async function POST(request: NextRequest) {
  console.log("[CREATE-USER API] POST request received");

  try {
    if (!supabaseAdmin) {
      console.error(
        "❌ [CREATE-USER API] SUPABASE_SERVICE_ROLE_KEY is not configured",
      );
      console.error("[CREATE-USER API] Environment check:", {
        SUPABASE_SERVICE_ROLE_KEY_exists:
          !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        NODE_ENV: process.env.NODE_ENV,
      });

      return NextResponse.json(
        {
          error: "Server configuration error",
          message: "SUPABASE_SERVICE_ROLE_KEY not configured",
          instructions:
            "Add SUPABASE_SERVICE_ROLE_KEY to .env.local (get it from Supabase Dashboard → Settings → API → Service Role)",
          receivedEnv: {
            hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
          },
        },
        { status: 500 },
      );
    }

    const body: CreateUserRequest = await request.json();
    console.log("[CREATE-USER API] Request body parsed:", {
      id: body.id,
      email: body.email,
      name: body.name,
    });

    const { id, email, name } = body;

    if (!id || !email || !name) {
      console.error("[CREATE-USER API] Missing required fields:", {
        hasId: !!id,
        hasEmail: !!email,
        hasName: !!name,
      });
      return NextResponse.json(
        { error: "Missing required fields: id, email, name" },
        { status: 400 },
      );
    }

    console.log("[CREATE-USER API] Attempting to insert user:", { id });

    // ✅ Create or update user with SERVICE ROLE (bypasses RLS)
    // Use upsert to handle case where user already exists
    const { data, error } = await supabaseAdmin
      .from("users")
      .upsert(
        {
          id,
          email,
          name,
          is_admin: false,
        },
        {
          onConflict: "id",
        },
      )
      .select("id, name, email, is_admin")
      .single();

    if (error) {
      console.error("[CREATE-USER API] Supabase upsert error:", {
        code: error.code,
        message: error.message,
        details: error.details,
        fullError: JSON.stringify(error),
      });

      return NextResponse.json(
        {
          error: "Failed to create or update user",
          details: error.message,
          code: error.code,
          supabaseError: JSON.stringify(error),
        },
        { status: 400 },
      );
    }

    if (!data) {
      console.error("[CREATE-USER API] Insert succeeded but no data returned");
      return NextResponse.json(
        {
          error: "Insert succeeded but no data returned",
        },
        { status: 400 },
      );
    }

    console.log("✅ [CREATE-USER API] User created successfully:", data.id);

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("❌ [CREATE-USER API] Unexpected error:", {
      errorType: typeof err,
      errorMessage: err instanceof Error ? err.message : String(err),
      errorStack: err instanceof Error ? err.stack : undefined,
      fullError: JSON.stringify(err),
    });

    return NextResponse.json(
      {
        error: "Unexpected server error",
        message: err instanceof Error ? err.message : String(err),
        type: typeof err,
      },
      { status: 500 },
    );
  }
}
