import React, { useState, useContext } from "react";
import "./dropdownUsuario.css";
import UserContext, { UserProvider } from "../redux/UserReducer";
import { Link } from "react-router-dom";

export default function DropdownUsuario() {
    const { state, dispatch } = useContext(UserContext);
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    
    return (
        <div className="Menu-usuario">
            <img  onClick={handleClick} src={state.user.photoUrl} alt="user" />
                <ul  className={click ? "dropdown-content" : "dropdown-content clicked"}>
                <li className="dropdown-item">
                    <Link to="/perfil">Perfil</Link>
                </li>
                <li className="dropdown-item">
                    <Link to="/sair">Sair</Link>
                </li>
                </ul>
            </div>
    );
}
