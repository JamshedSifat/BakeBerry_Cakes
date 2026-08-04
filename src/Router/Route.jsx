import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import Home from "../Components/Home/Home";
import Checkout from "../Pages/CartItems/Checkout/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element:<Home></Home>
      },
    //   {
    //     path:'cart',
    //     element:<CartItems></CartItems>
    //   },
      {
        path:'checkout',
        element:<Checkout></Checkout>
      },
    //    {
    //     path: "product/:id",
    //     element: <ProductDetails />,
    //   },
    ],
  },
]);