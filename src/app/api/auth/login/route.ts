import { NextResponse } from "next/server";
import { serverApiClient } from "@/lib/api/serverClient";
import type { LoginResponse } from "@/types";

const AUTH_COOKIE = "auth_token";
const COOKIE_MAX_AGE = 60 * 60 * 8;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const { data } = await serverApiClient.post<LoginResponse>("/login", {
      email,
      password,
    });

    const response = NextResponse.json({ success: true, email });
    response.cookies.set(AUTH_COOKIE, data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
