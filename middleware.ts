import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Middleware can be used for other purposes if needed
  // Auth protection is handled client-side in DashboardLayout
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
