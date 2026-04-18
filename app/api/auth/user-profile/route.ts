import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ═══════════════════════════════════════════════════════════════════════════
// Supabase Admin Client (uses SERVICE_ROLE_KEY to bypass RLS)
// ═══════════════════════════════════════════════════════════════════════════
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

interface UserProfile {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    console.log("[USER-PROFILE API] GET request received");

    // Get user ID from query parameters
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      console.error("[USER-PROFILE API] Missing userId parameter");
      return NextResponse.json(
        { error: "Missing userId parameter" },
        { status: 400 },
      );
    }

    console.log(`[USER-PROFILE API] Fetching profile for user: ${userId}`);

    // Fetch user profile using SERVICE_ROLE_KEY (bypasses RLS)
    const { data: userProfile, error } = await supabaseAdmin
      .from("users")
      .select("id, name, email, is_admin")
      .eq("id", userId)
      .single();

    if (error) {
      console.error(`[USER-PROFILE API] Database error:`, {
        code: error.code,
        message: error.message,
      });

      // User not found or other DB error
      return NextResponse.json(
        {
          error: error.message || "Failed to fetch user profile",
          code: error.code,
        },
        { status: 500 },
      );
    }

    if (!userProfile) {
      console.warn(`[USER-PROFILE API] User not found: ${userId}`);
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 },
      );
    }

    console.log(
      `✅ [USER-PROFILE API] User profile fetched successfully: ${userProfile.id}`,
    );

    return NextResponse.json<UserProfile>(userProfile, { status: 200 });
  } catch (error) {
    console.error("[USER-PROFILE API] Unexpected error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}
