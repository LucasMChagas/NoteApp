import React, { useState } from "react";
import 'bulma/css/bulma.css';
import logoImage from '../../assets/images/logo.png';
import { Link } from "react-router-dom";
import "../../styles/header.scss";

function Header() {
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };


    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to='/'>
                    <img src={logoImage} alt="Logo" />
                </Link>                
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

            <div className={`navbar-menu ${menuAberto ? 'is-active' : ''}`}>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button">
                                <strong>Register</strong>
                            </a>
                            <a className="button">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;