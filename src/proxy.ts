import { NextResponse, type NextRequest } from "next/server";

/**
 * Collapses URL variants to one canonical form before a page renders.
 *
 * Routes are lowercase, so `/About` or `/Work/Manuels` would otherwise
 * 404. A permanent redirect to the lowercase path keeps stray links and
 * search engines on the single indexable URL. Trailing slashes, www, and
 * the *.vercel.app alias are handled by next.config.ts.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();
  if (lower !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Only page-like paths: skip Next internals, the API, and any file with
  // an extension so assets are never touched.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
