import {  createBrowserRouter } from "react-router-dom";
import Home from "../src/screens/home";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
  ]);

export default router;