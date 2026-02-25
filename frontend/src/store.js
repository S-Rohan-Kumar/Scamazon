import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apislice.js"
import cartSliceReducer from "./slices/cartslice.js"


const store  = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart : cartSliceReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
})

export default store;