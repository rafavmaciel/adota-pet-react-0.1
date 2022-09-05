import React, { useState, useEffect, useContext } from "react";
import UserContext from "../redux/UserReducer";
import { useNavigate } from "react-router-dom";
import { Navbar, CardFooter } from "@material-tailwind/react";
import { db } from "../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { async } from "@firebase/util";

export default function MinhaConta() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    const [petsUser, setPetsUser] = useState([]);
    const [loading, setLoading] = useState(true);

    function logout() {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        // refresh page
        window.location.reload();
    }

    const getUser = async () => {
        onSnapshot(
            collection(db, "users", state.user.email),
            (querySnapshot) => {
                if (!querySnapshot.exists()) {
                    navigate("/cadastroUser");
                } 
            }
        );
    };
    

    const getPetsUser = async () => {
        onSnapshot(collection(db, "users", state.user.email, "pets"), (snapshot) => {
            setPetsUser(snapshot.docs.map((doc) => doc.data()));
            setLoading(false);
        });
    };

    useEffect(() => {
        getUser();
        getPetsUser();
    }, []);

    function handleClickModal() {
        navigate("/cadastroPet");
    }
    return (
        <div>
            <Navbar className="flex-col ">
                {/* infromações do usuário */}
                <CardFooter className="flex justify-between items-center bg-blue-500 mb-7 border-8 border-t-8 shadow-md">
                    <div className="flex items-center">
                        <img src={state.user.photoUrl} style={{}} alt="user" />
                        <div className="ml-8 mr-8">
                            <p className="text-4xl text-black">{state.user.user ? state.user.user : state.nomeUser}</p>
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
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4"></div>
                    </div>
                ) : (
                    <CardFooter className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <p className="text-4xl text-black mb-5 text-blue-600 ">Meus pets </p>
                            {petsUser.map((pet, i) => (
                                <div key={i} className="flex items-center">
                                <div className="flex items-center m-2 bg-[#fafafa] border-8 border-t-8 shadow-md transition duration-500 hover:scale-105 " id= {i} >
                                    <img className="w-500" src={pet.imgPrincipal} style={{ width:"100px" }} alt="user"  />
                                    <div className="ml-8 mr-8">
                                        <p className="text-2xl text-blue-600">Nome do pet:</p>
                                        <p className="text-xl text-black ">{pet.nomePet}</p>
                                        <p className="text-l text-blue-600 mt-2">Status do anuncio:</p>
                                        <p className="text-l text-black mx-2">{pet.statusPet}</p>
                                    </div>
                                </div>
                                {/* editar pets */}
                                <button className="bg-black hover:bg-stone-300 text-white font-bold py-2 px-4 mx-5 rounded" onClick={() => navigate(`/editarPet/${i}`)}>Editar</button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleClickModal}
                            className="bg-black hover:bg-stone-300 text-white font-bold py-2 px-4 rounded content-end"
                        >
                            Adicionar
                        </button>
                    </CardFooter>
                )}
            </Navbar>
        </div>
    );
}
