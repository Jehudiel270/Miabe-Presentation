import { supabase } from "@/lib/supabaseClient";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Fetch profile from public.users table using Auth ID (more secure)
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("id, name, email, is_admin")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("[GET /api/auth/user] Profile fetch error:", profileError);
      // Return auth user if profile doesn't exist yet
      return NextResponse.json({ user: user }, { status: 200 });
    }

    return NextResponse.json({ user: profile || user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
