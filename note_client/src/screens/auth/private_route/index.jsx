import React from "react";
import {Navigate} from "react-router-dom";



const privateRoute = ({children}) => {    
    const user = localStorage.getItem('user');
    return user ? children : <Navigate to={'/login'}/>;         
    } 


export default privateRoute;