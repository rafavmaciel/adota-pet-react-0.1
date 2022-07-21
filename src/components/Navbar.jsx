import React, { useState } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import "./navbar.css";
import { Link } from "react-router-dom";
import { MenuPetItens } from './MenuPetItens';
import Search from "./Search";
export default function Navbar() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

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
                        {dropdown && <Dropdown menuItens = {MenuPetItens} />}
                    </li>
                    <li className="nav-item">
                        <Link to="/products" className="nav-links" onClick={closeMobileMenu}>
                            Minha Conta
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
                            Contate - Nos
                        </Link>
                    </li>
                    <li>
                        <Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>
                            Sign Up
                        </Link>
                    </li>
                </ul>
                <Button />
                <Search/>
            </nav>
        </>
    );
}
