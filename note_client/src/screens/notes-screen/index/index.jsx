import React, { useState, useEffect }from "react";
import HeaderLogged from "../../../components/header-logged";
import Notes from "../../../components/notes"



function NotesScreen(){
    const [openMenu, setOpenMenu] = useState(false)
    return (
        <>
            <HeaderLogged setOpenMenu={setOpenMenu} openMenu={openMenu}/>
            <Notes setOpenMenu={setOpenMenu} openMenu={openMenu}/>
        </>
    )
}

export default NotesScreen;