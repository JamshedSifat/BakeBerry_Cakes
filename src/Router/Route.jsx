import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import Home from "../Components/Home/Home";
import CartItems from "../Pages/CartItems/CartItems";
import Checkout from "../Pages/CartItems/Checkout/Checkout";
import ProductDetails from "../Components/Products/ProductDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element:<Home></Home>
      },
      {
        path:'cart',
        element:<CartItems></CartItems>
      },
      {
        path:'checkout',
        element:<Checkout></Checkout>
      },
       {
        path: "product/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);