import { USERS_URL } from "../constants.js";
import { apiSlice } from "./apislice.js";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 5,
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 5,
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/`,
      }),
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 5,
    }),
    deleteUser : builder.mutation({
      query : (id) => ({
        url : `${USERS_URL}/${id}`,
        method : "DELETE",
      }),
      keepUnusedDataFor: 5,
    })
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation  , useGetAllUsersQuery , useDeleteUserMutation} =
  usersApiSlice;
