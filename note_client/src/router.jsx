import { createBrowserRouter, Router, Routes, Route } from "react-router-dom";
import Home from "../src/screens/home";
import Register from "../src/screens/auth/register";
import Login from "../src/screens/auth/login"
import Notes from "../src/screens/notes-screen/index";
import UserEdit from "../src/screens/auth/user_edit"
import PrivateRoute from "./screens/auth/private_route";

const router = createBrowserRouter([         
    {
        path: "/",
        element: <Home/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
        path: "/notes",
      element: <PrivateRoute><Notes/></PrivateRoute>,            
    },
    {
      path: "/user_edit",
      element: <PrivateRoute><UserEdit/></PrivateRoute>
    }  
  ]);

export default router;