import { PRODUCT_URL } from "../constants.js";
import { apiSlice } from "./apislice.js";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getProducts : builder.query({
            query : () => ({
                url : PRODUCT_URL,
            }),
            transformResponse: (response) => response.data,
            keepUnusedDataFor : 5 ,
        }),
        getproductDetails : builder.query({
            query : (id) => ({
                url : `${PRODUCT_URL}/${id}`
            }),
            transformResponse : (response) => response.data,
            keepUnusedDataFor : 5,
        })
    })    
})

export const {useGetProductsQuery , useGetproductDetailsQuery} = productApiSlice