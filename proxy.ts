import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_SESSION, jetonValide } from "@/lib/session";

// Redirige vers la page de connexion toute visite de /admin sans session valide.
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/connexion") {
    return NextResponse.next();
  }
  if (await jetonValide(request.cookies.get(COOKIE_SESSION)?.value)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/admin/connexion", request.url));
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
