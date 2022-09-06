import { FaFacebookF, FaLinkedinIn, FaGoogle, FaEnvelope} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { signInWithGoogle } from "../config/googleAtutentication";
import { useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../redux/UserReducer";
import {db} from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function LoginModal() {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(UserContext);
    async function logarGoogle() {
        let user = await signInWithGoogle();
        dispatch({ type: "SET_USER", payload: user });
        await getUser(user);
    }

//buscar usuario
const  getUser = async (user) => {
    const userRef =  doc(db, "users", user.email);
    const userDoc = await getDoc(userRef).then(doc => {
        return doc.exists()
    }).catch(err => {
        console.log(err)
    })
    if(!userDoc) {
        navigate("/cadastroUser")
        console.log("usuario nao existe")
    }
    else {
        dispatch({ type: "SET_REGISTEDED", payload: true });
        console.log(state.user)
        navigate("/");
    }
}
//dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });

    useEffect(() => {
        console.log(state.user)
        if (state.user.isAuthenticated === true) {
            navigate("/");
            //window.location.reload();
        }
    }
    , [state.user.isAuthenticated]);

    
    return (
        <div className="flex flex flex-col items-center justify-center min-h-screen py-2 ">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl ">
                    <div className="w-3/5 p-5">
                        <div className="text-left font-bold">
                            <span className="text-blue-500">Adota </span>Pet
                        </div>
                        <div className="py-10">
                            <h2 className="text-3xl font-bold text-blue-500 mb-2">Logar com uma conta</h2>
                            <div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>
                            <div className="flex justify-center my-2">
                                <a href="#" className="border-2 border-gray-100 rounded-full p-3 mx-1 hover:bg-blue-500 hover:border-gray-100 hover:children:text-white ">
                                    <FaFacebookF className="text-blue-500 flex-1 hover:text-white " />
                                </a>
                                <a href="#" className="border-2 border-gray-100 rounded-full p-3 mx-1 hover:bg-blue-500 hover:border-gray-100 ">
                                    <FaLinkedinIn className="text-blue-500 hover:text-white" />
                                </a>
                                <a onClick={e => logarGoogle()} className="border-2 border-gray-100 rounded-full p-3 mx-1 hover:bg-blue-500 hover:border-gray-100 ">
                                    <FaGoogle className="text-blue-500 hover:text-white" />
                                </a>
                            </div>
                            {/* Social login section */}
                            <p className="text-gray-400 my-3">ou entre com sua conta de email </p>
                            <div className="flex flex-col items-center">
                                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                    <FaEnvelope className="text-gray-400 m-2" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="bg-gray-100 outline-none text-sm
flex-1"
                                    />
                                </div>
                                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                    <MdLockOutline className="text-gray-400 m-2" />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Senha"
                                        className="bg-gray-100 outline-none
text-sm flex-1"
                                    />
                                </div>
                                <div className="flex justify-between w-64 mb-5">
                                    <label className="flex items-center text-xs">
                                        <input type="checkbox" name="remember" className="mr-1" /> 
                                    </label>
                                    <a href="#" className="text-xs">
                                        Esqueceu a senha?
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 ">
                        <h2 className="text-3xl font-bold mb-2">Seja bem vindo!</h2>
                        <div className="border-2 w-10 border-white inline-block mb-2"></div>
                        <p className="mb-10">Entre com uma conta para continuar.</p>
                        <a
                            href="#"
                            className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold bg-white text-blue-500 hover:border-2 border-white hover:bg-blue-500 hover:text-white  "
                        >
                            Cadastrar
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
