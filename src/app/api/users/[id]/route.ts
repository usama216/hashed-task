import { NextResponse } from "next/server";
import { serverApiClient } from "@/lib/api/serverClient";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const { data } = await serverApiClient.get(`/users/${id}`);

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch user";

    return NextResponse.json({ error: message }, { status: 404 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { data } = await serverApiClient.put(`/users/${id}`, body);

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update user";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
