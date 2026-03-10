import { ORDERS_URL, PAYPAL_URL } from "../constants.js";
import { apiSlice } from "./apislice.js";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/me`,
      }),
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 5,
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 5,
    }),
    getOrder: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({orderId, details}) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }), 
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 5,
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders : builder.query({
      query : () => ({
        url : `${ORDERS_URL}/me`,
      }),
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 5,
    }),
    getorderlsit : builder.query({
      query : () => ({
        url : `${ORDERS_URL}/`,
      }),
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 5,
    }),
    deliverOrder : builder.mutation({
      query : (orderId) => ({
        url : `${ORDERS_URL}/${orderId}/deliver`,
        method : "PUT",
      }),
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 5,
    })
  }),
});

export const {
  useGetMyOrdersQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetOrdersQuery,
  useGetorderlsitQuery,
  useDeliverOrderMutation
} = ordersApiSlice;
