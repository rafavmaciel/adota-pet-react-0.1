import React, { useState, useReducer, useEffect, useContext } from "react";
import UserContext, { UserProvider } from "../redux/UserReducer";
import { useNavigate } from "react-router-dom";
import { Navbar, CardFooter } from "@material-tailwind/react";
import CadastroPet from "../components/CadastroPet";

export default function MinhaConta() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    const [ showModal, setShowModal ] = useState(false);

    function logout() {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        // refresh page
        window.location.reload();
    }

    function handleClickModal() {
        navigate("/cadastroPet");
    }

    return (
        <div>
        <Navbar transparent className="flex-col ">
{/* infromações do usuário */}
            <CardFooter className="flex justify-between items-center bg-blue-500 mb-7">
                <div className="flex items-center">
                    <img src={state.user.photoUrl} style={{}} alt="user" />
                    <div className="ml-8 mr-8">
                        <p className="text-4xl text-black">{state.user.user}</p>
                        <p className="text-base text-black">{state.user.email}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <button
                        className="bg-black hover:bg-stone-300 text-white font-bold py-2 px-4 rounded"
                        onClick={logout}
                    >
                        Sair
                    </button>
                </div>
            </CardFooter>

{/* lista de pets */}
            <CardFooter className="flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-4xl text-black mb-5">Meus pets </p>
                    <p className="text-base text-black"> cachorro 1 </p>
                    <p className="text-base text-black"> cachorro 2 </p>
                    <p className="text-base text-black"> cachorro 3 </p>
                    </div>
                    <button  onClick={ handleClickModal } className="bg-black hover:bg-stone-300 text-white font-bold py-2 px-4 rounded content-end">
                        Adicionar
                    </button>
            </CardFooter>
        </Navbar>
    </div>
    );
}
