import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IBanner {
  id: number;
  title: string;
  text: string;
  banner: string;
  image: string;
  url: string;
}

export const Banners = createApi({
  reducerPath: 'banners',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://imenu.kg/api/' }),
  endpoints: (builder) => ({
    getBanners: builder.query<IBanner[], void>({
      query: () => ({
        url: 'banners',
        method: 'GET',
      }),
    }),
    addBanner: builder.mutation<IBanner, Partial<IBanner>>({
      query: (newBanner) => ({
        url: 'banners',
        method: 'POST',
        body: newBanner,
      }),
    }),
  }),
});

export const { useGetBannersQuery, useAddBannerMutation } = Banners;
