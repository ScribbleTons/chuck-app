// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { chuck } from './types'

type Joke = {
  value: string;
  icon_url: string
  id:string
} 

// Define a service using a base URL and expected endpoints
export const chuckApi = createApi({
  reducerPath: "chuckApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.chucknorris.io/jokes" }),
  endpoints: (builder) => ({
    getRandomJokes: builder.query<Joke, void>({
      query: () => `/random`,
    }),
    getJokesByCategory: builder.query<Joke, string>({
      query: (category) => `/random?category=${category}`,
    }),
    getCategories: builder.query<string[], void>({
      query: () => "/categories",
    }),
    getSearchJokes: builder.query<{result:Joke[]}, string>({
      query: (query) => `/search?query=${query}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetRandomJokesQuery,
  useLazyGetSearchJokesQuery,
  useLazyGetCategoriesQuery,
  useGetJokesByCategoryQuery,
} = chuckApi;
