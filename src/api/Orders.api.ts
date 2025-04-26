import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IOrder, IOrderById } from 'src/types/orders.types';

export const Orders = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://imenu.kg/api/' }),
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], { tableNum?: string; venueSlug?: string; spotSlug?: string }>({
      query: ({ tableNum, venueSlug, spotSlug }) => {
        const params = new URLSearchParams();
        if (tableNum) params.append('tableNum', tableNum);
        if (venueSlug) params.append('venueSlug', venueSlug);
        if (spotSlug) params.append('spotSlug', spotSlug);

        return `orders/?${params.toString()}`;
      },
    }),
    postOrders: builder.mutation<{ paymentUrl: string }, IOrder>({
      query: (newOrder) => {
        return {
          url: 'orders/',
          method: 'POST',
          body: newOrder,
        };
      },
    }),
    getOrdersById: builder.query<IOrderById, { id: number }>({
      query: ({ id }) => {
        return `orders/${id}/`;
      },
    })
  }),
});

export const { useGetOrdersQuery, usePostOrdersMutation, useGetOrdersByIdQuery } = Orders;
