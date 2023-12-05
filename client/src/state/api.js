import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi( {
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL}),   // link to the .env.local file port 
    reducerPath: "adminApi", 
    tagTypes: ["User"], 
    endpoints: (build) => ({
        /* identify the API calls we're gonna make */
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        })
    })
})

export const { useGetUserQuery, } = api;