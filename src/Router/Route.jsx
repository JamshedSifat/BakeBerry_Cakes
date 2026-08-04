import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import Home from "../Components/Home/Home";
import Checkout from "../Pages/CartItems/Checkout/Checkout";
import Cart from "../Pages/Cart";
import MyProfile from "../Components/Shared/profile/MyProfile";
import Dashboard from "../Components/Shared/profile/Dashboard";

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
        element:<Cart></Cart>
      },
      {
        path:'checkout',
        element:<Checkout></Checkout>
      },
      {
        path:'profile',
        element:<MyProfile></MyProfile>

      },
      {
        path:'dashboard',
        element:<Dashboard></Dashboard>
      }
   
    ],
  },
]);