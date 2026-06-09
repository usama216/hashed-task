import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const rawQuery = fetchBaseQuery({
  baseUrl: "/api",
});

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  opts,
) => {
  const result = await rawQuery(args, api, opts);

  if (result.error) {
    const data = result.error.data as { error?: string } | undefined;
    return {
      error: {
        ...result.error,
        message: data?.error || "Request failed",
      },
    };
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Users", "User"],
  endpoints: () => ({}),
});
