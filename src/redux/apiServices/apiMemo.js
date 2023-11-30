import { apiSlice } from "./apiSlice";

export const apiMemoSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMemos: builder.query({
            query: () => '/get-memos-secured',
            keepUnusedDataFor: 5,
        })
    })
})

export const { useGetMemosQuery } = apiMemoSlice