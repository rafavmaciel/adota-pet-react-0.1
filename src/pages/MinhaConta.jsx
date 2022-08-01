import React, { useState, useReducer, useEffect, useContext } from "react";
import UserContext, {UserProvider} from "../redux/UserReducer";
import { useNavigate } from "react-router-dom";

export default function MinhaConta() {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(UserContext);

    function logout () {
        dispatch({type: 'LOGOUT'});
        navigate("/");
        // refresh page
        window.location.reload()
    }

    return (
        <div>
            <div className="container mx-auto my-3">
                <div className="row">
                    <h4 className="my-4 " > Informações:</h4>
                    <p className="col-md-6">{state.user.user}</p>
                    <p className="col-md-6">{state.user.email}</p>

                    <button className="btn btn-primary" onClick={logout}>Logout</button>

                </div>
            </div>
        </div>
    );
}
