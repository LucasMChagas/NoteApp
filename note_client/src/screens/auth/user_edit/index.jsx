import React, { useState, useEffect }from "react";
import HeaderLogged from "../../../components/header-logged";
import UserEdit from "../../../components/form-user-edit"
import "../../../styles/user_edit.scss"



function UserEditScreen(){
    const [openMenu, setOpenMenu] = useState(false)
    return (
        <>
            <HeaderLogged setOpenMenu={setOpenMenu} openMenu={openMenu}/>
            <UserEdit />
        </>
    )
}

export default UserEditScreen;