import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategory } from 'src/types/categories.types';

export const Categories = createApi({
  reducerPath: 'categories',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://imenu.kg/api/' }), // Базовый URL для запросов
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => 'categories/',
    }),
    addCategories: builder.mutation<void, ICategory>({
      query: (newCategory) => ({
        url: 'posts',
        method: 'POST',
        body: newCategory,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoriesMutation } = Categories;
