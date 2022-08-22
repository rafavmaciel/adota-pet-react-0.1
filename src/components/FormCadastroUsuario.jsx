import { useState, useEffect, useReducer, useContext } from "react";
import { db, storage } from "../config/firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { estadosBrasileiros, tiposAnimais, porteAnimais } from "../content/dadosFormulario";
import { useNavigate } from "react-router-dom";
import UserContext, {UserProvider} from "../redux/UserReducer";

export default function FormCadastroPet() {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {nomeUser, email, cpfUser, telUser, estadoUser, cidadeUser} = e.target.elements;
        console.log(nomeUser.value, email.value, cpfUser.value, telUser.value, estadoUser.value, cidadeUser.value);
        const userRef = doc(db, "users", state.user.uid);
        let data = {
            nomeUser: nomeUser.value,
            email: email.value,
            cpfUser: cpfUser.value,
            telUser: telUser.value,
            estadoUser: estadoUser.value,
            cidadeUser: cidadeUser.value,
            dataCadastro: Timestamp.fromDate(new Date())
        }

        setDoc(userRef, data).then((user) => {
            dispatch({ type: "SET_REGISTEDED", payload: true });
            dispatch({ type: "SET_DATA_CAD_USER", payload: data });
            console.log("usuario cadastrado com sucesso");
            navigate("/");
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <form onSubmit={handleSubmit} id="formCadastroPet">
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                    <label for="nomeUser" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Nome do Usuario
                    </label>
                    <input
                        type="text"
                        id="nomeUser"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Joly"
                        value={state.user.user}
                        required
                    />
                </div>
                <div>
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doe"
                        value={state.user.email}
                        disabled
                        required
                    />
                </div>
                <div>
                    <label for="cpfUser" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        CPF
                    </label>
                    <input
                        id="cpfUser"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="12345678900"
                        pattern="[0-9]{11}"
                    />

                </div>
                <div>
                    <label
                        for="telUser"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Telefone para contato
                    </label>
                    <input
                        type="tel"
                        id="telUser"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="81999124678"
                        pattern="[0-9]{11}"
                        required
                    />
                </div>
                <div>
                    <label for="estadoUser" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Estado
                    </label>
                    <select
                        id="estadoUser"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="flowbite.com"
                        required
                    >
                        {estadosBrasileiros.map((estado) => (
                            <option key={Object.keys(estado)}>{Object.values(estado)}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label for="cidadeUser" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Cidade{" "}
                    </label>
                    <input
                        type="text"
                        id="cidadeUser"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                    />
                </div>
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 my-10 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
    );
}
