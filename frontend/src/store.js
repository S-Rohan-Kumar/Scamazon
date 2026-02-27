import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apislice.js"
import cartSliceReducer from "./slices/cartslice.js"
import authSliceReducer from "./slices/authSlice.js"


const store  = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart : cartSliceReducer,
        auth : authSliceReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
})

export default store;