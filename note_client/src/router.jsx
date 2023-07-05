import {  createBrowserRouter } from "react-router-dom";
import Home from "../src/screens/home";
import Register from "../src/screens/auth/register";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/register",
      element: <Register/>,
    }
  ]);

export default router;