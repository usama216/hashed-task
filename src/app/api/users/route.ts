import { NextResponse } from "next/server";
import { serverApiClient } from "@/lib/api/serverClient";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    const { data } = await serverApiClient.get("/users", {
      params: { page },
    });

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch users";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data } = await serverApiClient.post("/users", body);

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create user";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
