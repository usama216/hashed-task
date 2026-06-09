import type { User, UserFormData, UsersResponse } from "@/types";
import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const firstPage = await fetchWithBQ("/users?page=1");

        if (firstPage.error) {
          return { error: firstPage.error };
        }

        const firstData = firstPage.data as UsersResponse;
        const allUsers = [...firstData.data];

        if (firstData.total_pages > 1) {
          for (let page = 2; page <= firstData.total_pages; page += 1) {
            const nextPage = await fetchWithBQ(`/users?page=${page}`);

            if (nextPage.error) {
              return { error: nextPage.error };
            }

            allUsers.push(...(nextPage.data as UsersResponse).data);
          }
        }

        return { data: allUsers };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User" as const, id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),

    getUserById: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: { data: User }) => response.data,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    createUser: builder.mutation<User, UserFormData>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    updateUser: builder.mutation<User, { id: number; payload: UserFormData }>({
      query: ({ id, payload }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        { type: "Users", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersApi;
