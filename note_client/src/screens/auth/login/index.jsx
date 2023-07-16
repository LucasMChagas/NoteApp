import React from "react";
import Header from "../../../components/header";
import "../../../styles/form.scss"
import FormLogin from "../../../components/form-login";

function LoginScreen(){
    return (
        <>
            <Header/>
            <FormLogin/>
        </>
    )
}

export default LoginScreen;