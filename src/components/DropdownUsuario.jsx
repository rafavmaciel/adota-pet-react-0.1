import React, { useState, useContext } from "react";
import "./dropdownUsuario.css";
import UserContext, { UserProvider } from "../redux/UserReducer";
export default function DropdownUsuario() {
    const { state, dispatch } = useContext(UserContext);
    const [click, setClick] = useState(false);
    console.log(state.user.photoURL);
    return (
        <div className="Menu-usuario">
            <img src={state.user.photoURL} alt="user" />
        </div>
    );
}
