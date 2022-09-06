import React, { useState, useContext, useEffect } from "react";
import "./style/dropdownUsuario.css";
import UserContext, { UserProvider } from "../redux/UserReducer";
import { Link } from "react-router-dom";

export default function DropdownUsuario() {
    const { state, dispatch } = useContext(UserContext);
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    function logout () {
        dispatch({type: 'LOGOUT'});
        // refresh page
        window.location.reload()
    }

    return (
        <div className="Menu-usuario">
            <img  onClick={handleClick} src={state.user.photoUrl}  referrerPolicy="no-referrer"  />
                <ul  className={click ? "dropdown-content" : "dropdown-content clicked"}>
                <li  onClick={handleClick} className="dropdown-item">
                    <Link to="/conta">Perfil</Link>
                </li>
                <li  onClick={handleClick} className="dropdown-item">
                    <p onClick={logout}>Sair</p>
                </li>
                </ul>
            </div>
    );
}
