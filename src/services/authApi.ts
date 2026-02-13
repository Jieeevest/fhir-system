import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define interfaces for Auth API
export interface LoginResponse {
  data: {
    token: string;
    email: string;
    fullName: string;
    role: any;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  source: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
}

export interface ForgetPasswordResponse {
  message: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

const authorizedEndpoint = [
  "getUser",
  "updateProfile",
  "updatePassword",
  "updateAvatar",
];

// Create a separate API instance for authentication
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api`,
    prepareHeaders: (headers, { endpoint }) => {
      if (authorizedEndpoint.includes(endpoint as string)) {
        const token = localStorage.getItem("accessToken");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query<any, void>({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    verifyResetToken: builder.query({
      query: (token) => `/auth/verify-reset-token?token=${token}`,
    }),
    resetPassword: builder.mutation<any, ResetPasswordRequest>({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
    forgetPassword: builder.mutation<
      ForgetPasswordResponse,
      ForgetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation<void, Partial<any>>({
      query: (payload) => ({
        url: `/auth/update-profile`,
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }),
    }),
    updatePassword: builder.mutation<void, Partial<any>>({
      query: (payload) => ({
        url: `/auth/update-password`,
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }),
    }),
    updateAvatar: builder.mutation<void, { newImage: string }>({
      query: (payload) => ({
        url: `/auth/update-avatar`,
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useVerifyResetTokenQuery,
  useResetPasswordMutation,
  useForgetPasswordMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useUpdateAvatarMutation,
} = authApi;
