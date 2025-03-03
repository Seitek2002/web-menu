import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategory } from 'src/types/categories.types';
import { IProductCatalog } from 'src/types/products.types';

export const Products = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://imenu.kg/api/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProductCatalog[], { category?: number; search?: string; spotSlug?: string, venueSlug?: string }>({
      query: ({ category, search, spotSlug, venueSlug }) => {
        const params = new URLSearchParams();
        if (category) params.append('category', category + '');
        if (search) params.append('search', search);
        if (spotSlug) params.append('spotSlug', spotSlug);
        if (venueSlug) params.append('venueSlug', venueSlug);

        return `products/?${params.toString()}`;
      },
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

export const { useGetProductsQuery, useAddCategoriesMutation } = Products;
