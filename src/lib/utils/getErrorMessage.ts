import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type QueryError = FetchBaseQueryError | SerializedError | undefined;

export function getErrorMessage(error: QueryError) {
  if (!error) return "Request failed";

  if ("message" in error && error.message) return String(error.message);

  if ("data" in error && error.data && typeof error.data === "object") {
    const data = error.data as { error?: string };
    if (data.error) return data.error;
  }

  return "Request failed";
}
