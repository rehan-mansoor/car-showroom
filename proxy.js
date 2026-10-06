import { NextResponse } from "next/server";

export function proxy(request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Panel"',
      },
    });
  }

  const encodedCredentials = authHeader.split(" ")[1];
  const decodedCredentials = atob(encodedCredentials);
  const separatorIndex = decodedCredentials.indexOf(":");

  const username = decodedCredentials.slice(0, separatorIndex);
  const password = decodedCredentials.slice(separatorIndex + 1);

  if (
    username !== process.env.ADMIN_USER ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return new NextResponse("Invalid credentials", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Panel"',
      },
    });
  }

  if (request.nextUrl.pathname.startsWith("/admin-api/")) {
    const headers = new Headers(request.headers);

    headers.set("x-admin-token", process.env.ADMIN_API_TOKEN);

    headers.delete("authorization");

    const backendUrl = new URL(
      `${request.nextUrl.pathname.replace(
        "/admin-api",
        "/api",
      )}${request.nextUrl.search}`,
      process.env.NEXT_PUBLIC_API_URL,
    );

    return NextResponse.rewrite(backendUrl, {
      request: {
        headers,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-api/:path*"],
};
