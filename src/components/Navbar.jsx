import React, { useState, useReducer, useEffect, useContext } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import "./navbar.css";
import { Link } from "react-router-dom";
import { MenuPetItens } from "./MenuPetItens";
import Search from "./Search";
import DropdownUsuario from "./DropdownUsuario";
import UserContext, { UserProvider } from "../redux/UserReducer";

export default function Navbar() {
    const { state, dispatch } = useContext(UserContext);
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [auth, setAuth] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    useEffect(() => {
        //console.log('estado');
        //console.log(state);
        if (state.user.isAuthenticated === true) {
            setAuth(true);
            // console.log(auth);
        }
    }, [state.user.isAuthenticated]);

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    ADOTA PET
                    <i class="fa fa-paw" />
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? "fas fa-times" : "fas fa-bars"} />
                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <Link to="/pets" className="nav-links" onClick={closeMobileMenu}>
                            Pets <i className="fas fa-caret-down" />
                        </Link>
                        {dropdown && <Dropdown menuItens={MenuPetItens} />}
                    </li>
                    {auth ? (
                        <li className="nav-item">
                            <Link to="/conta" className="nav-links" onClick={closeMobileMenu}>
                                Minha Conta
                            </Link>
                        </li>
                    ) : (
                        <div></div>
                    )}

                    <li className="nav-item">
                        <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
                            Contate - Nos
                        </Link>
                    </li>
                    <li>
                        {/* se autenticado, trocas esse botão pelo dropdonw do user */}
                        <Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>
                            Sign Up
                        </Link>
                    </li>
                </ul>
                {auth ? <DropdownUsuario /> : <Button />}
                <Search />
            </nav>
        </>
    );
}
