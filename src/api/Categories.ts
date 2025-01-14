import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IItem {
  categoryId: string;
  categoryName: string;
  categoryPhoto: string;
  categoryPhotoOrigin: string;
}

type CategoriesResponse = IItem[]

export const Categories = createApi({
  reducerPath: 'categories',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://imenu.kg/' }), // Базовый URL для запросов
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => 'categories/',
    }),
    addCategories: builder.mutation<void, IItem>({
      query: (newCategory) => ({
        url: 'posts',
        method: 'POST',
        body: newCategory,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoriesMutation } = Categories;
