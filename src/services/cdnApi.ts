import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cdnApi = createApi({
  reducerPath: "cdnApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    // Add token to the request headers if available
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<
      { data: { filename: string; fileUrl: string } },
      FormData
    >({
      query: (formData) => ({
        url: "/cdn/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = cdnApi;
