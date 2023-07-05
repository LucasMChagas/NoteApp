import React from "react";
import Header from "../../../components/header";
import "../../../styles/register.scss"
import FormRegister from "../../../components/form-register";

function RegisterScreen(){
    return (
        <>
            <Header/>
            <FormRegister/>
        </>
    )
}

export default RegisterScreen;