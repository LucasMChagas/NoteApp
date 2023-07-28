import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/header.scss"
import UsersService from "../../services/users";
import logoImage from '../../assets/images/logo-white.png';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown, faList} from '@fortawesome/free-solid-svg-icons'

function HeaderLogged(props) {
    let User = localStorage.getItem('user')
    const location = useLocation();
    const navigate = useNavigate();
    const [menuAberto, setMenuAberto] = useState(false);
    const [dropDownShow, setDropDownShow] = useState(false);
    const [user, setUser] = useState(JSON.parse(User))

    const rotasComBotaoVisivel = ['/user_edit'];    

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);        
    };
    const toggleDropDown = () => {
        setDropDownShow(!dropDownShow);        
    };


    return (
        <nav className={`navbar has-background-custom-purple`} role="navigation" aria-label="main navigation" >
            <div className="navbar-brand">
                <Link className="navbar-item" to='/notes'>
                    <img src={logoImage} alt="Logo" />
                </Link>
                <div className="navbar-start" >
                    <div className="navbar-item">
                        {!rotasComBotaoVisivel.includes(location.pathname) && (
                        <button  class="button is-white is-outlined purple-hover"  onClick={() => props.setOpenMenu(!props.openMenu)}>
                        <FontAwesomeIcon icon={faList}></FontAwesomeIcon></button>)}                        
                    </div>
                </div>
                <a
                    role="button"
                    className={`navbar-burger ${menuAberto ? 'is-active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="menu"
                    aria-expanded={menuAberto ? 'true' : 'false'}
                    data-target="navbarBasicExample">
                    <span></span>
                    <span></span>
                    <span></span>                  
                </a>                
            </div>

            <div className={`navbar-menu has-background-custom-purple ${menuAberto ? 'is-active' : ''}`}>
                
                <div className="navbar-end" id="dropDown">
                    <div className="navbar-item">
                        <div class={`dropdown  ${dropDownShow ? 'is-active' : ''}`}
                        onClick={toggleDropDown}>
                            <div class="dropdown-trigger ">
                                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                    <span>{user.name}</span>
                                    <span class="icon is-small">
                                        <FontAwesomeIcon icon={faAngleDown} style={{color: "#000000",}} />
                                    </span>
                                </button>
                            </div>
                            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                <div class="dropdown-content">
                                    <a onClick={()=>navigate('/user_edit')} href="#" class="dropdown-item">
                                        Users edit
                                    </a>                                    
                                    <hr class="dropdown-divider"/>
                                        <a onClick={UsersService.logout} href="/" class="dropdown-item">
                                            Logout
                                        </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default HeaderLogged;