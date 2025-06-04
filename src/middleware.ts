import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// This middleware will be executed for these paths
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  // Create a Supabase client configured to use cookies
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session and on a protected route, redirect to login
  if (
    !session &&
    config.matcher.some((path) =>
      request.nextUrl.pathname.startsWith(path.replace(":path*", ""))
    )
  ) {
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("login", "true");
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}
