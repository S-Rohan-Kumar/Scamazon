import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HomeScreen } from "./page/HomeScreen.jsx";
import PrivateRouter from "./components/PrivateRouter";
import { ProductSceen } from "./page/ProductSceen.jsx";
import CartScreen from "./page/CartScreen.jsx";
import LoginScreen from "./page/LoginScreen.jsx";
import ShippingScreen from "./page/ShippingScreen.jsx";
import RegisterScreen from "./page/RegisterScreen.jsx";
import PaymentScreen from "./page/PaymentScreen.jsx";
import PlaceOrderScreen from "./page/PlaceOrderScreen.jsx";
import OrderScreen from "./page/OrderScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductSceen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRouter />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>,
);
