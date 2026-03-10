import { PRODUCT_URL } from "../constants.js";
import { apiSlice } from "./apislice.js";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getProducts : builder.query({
            query : ({ keyword , pageNumber}) => ({
                url : PRODUCT_URL,
                params : { keyword , pageNumber}
            }),
            transformResponse: (response) => response.data,
            providesTags: ['Product'],
            keepUnusedDataFor : 5 ,
        }),
        getproductDetails : builder.query({
            query : (id) => ({
                url : `${PRODUCT_URL}/${id}`
            }),
            transformResponse : (response) => response.data,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
            keepUnusedDataFor : 5,
        }),
        updateProduct : builder.mutation({
            query : ({ productId, formData }) => ({
                url : `${PRODUCT_URL}/${productId}`,
                method : "PUT",
                body : formData,
            }),
            transformResponse: (response) => response.data,
            keepUnusedDataFor : 5 ,
            invalidatesTags: (result, error, { productId }) => [{ type: 'Product', id: productId }],
        }),
        createProduct : builder.mutation({
            query : (data) => ({
                url : PRODUCT_URL,
                method : "POST",
                body : data,
            }),
            transformResponse: (response) => response.data,
            keepUnusedDataFor : 5 ,
        }),
        deleteProduct : builder.mutation({
            query : (id) => ({
                url : `${PRODUCT_URL}/${id}`,
                method : "DELETE",
            }),
            transformResponse: (response) => response.data,
            keepUnusedDataFor : 5 ,
        }),
        createReview : builder.mutation({
            query : ({id ,rating , comment}) => ({
                url : `${PRODUCT_URL}/${id}/reviews`,
                method : "POST",
                body : {rating , comment},
            }),
            transformResponse: (response) => response.data,
            keepUnusedDataFor : 5 , 
        }),
        getTopProducts : builder.query({
            query : () => ({
                url : `${PRODUCT_URL}/top`,
            }),
            transformResponse: (response) => response.data,
            keepUnusedDataFor : 5 , 
        }),
    })    
})

export const {useGetProductsQuery , useGetproductDetailsQuery , useUpdateProductMutation , useCreateProductMutation , useDeleteProductMutation , useCreateReviewMutation  , useGetTopProductsQuery} = productApiSlice