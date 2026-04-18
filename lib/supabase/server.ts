import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export function createClient() {
  // Server-side Supabase client for RSC (React Server Components)
  // Uses environment variables that are only available on the server
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export function getServerSupabaseClient(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  // If token exists, set auth session directly
  if (token) {
    supabase.auth.setSession({
      access_token: token,
      refresh_token: token,
    } as any);
  }

  return supabase;
}
