import { useState, useEffect, useReducer, useContext } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { async } from "@firebase/util";

export default function FormCadastroPet() {
    const [formaData, setFormaData] = useState({
        nome: "",
        tipo: "",
        porte: "",
        telefone: "",
        estado: "",
        cidade: "",
        descricao: "",
        foto: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "pets"), {
                nomePet: e.target.nomePet.value,
                tipoPet: e.target.tipoPet.value,
                    portePet: e.target.portePet.value,
                    telefone: e.target.telefonePet.value,
                    estadoPet: e.target.estadoPet.value,
                    cidadePet: e.target.cidadePet.value,
                    descricaoPet: e.target.descricaoPet.value,
                })
                .then(() => {
                    console.log("Pet cadastrado com sucesso!");
                    
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                    <label for="nomePet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Nome do pet{" "}
                    </label>
                    <input
                        type="text"
                        id="nomePet"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Joly"
                        required
                    />
                </div>
                <div>
                    <label for="tipoPet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Tipo do pet
                    </label>
                    <select
                        id="tipoPet"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doe"
                        required
                    >
                        <option value="">Cachorro</option>
                        <option value="1">Gato</option>
                        <option value="2">Papagaio</option>
                        <option value="3">Outros</option>
                    </select>
                </div>
                <div>
                    <label for="portePet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Porte do pet
                    </label>
                    <select
                        id="portePet"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Flowbite"
                        required
                    >
                        <option value="">Choose...</option>
                        <option value="1">Pequeno</option>
                        <option value="2">Médio</option>
                        <option value="3">Grande</option>
                    </select>
                </div>
                <div>
                    <label
                        for="Telefone para contato"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Telefone para contato{" "}
                    </label>
                    <input
                        type="tel"
                        id="telefonePet"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="81-99912-4678"
                        pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
                        required
                    />
                </div>
                <div>
                    <label for="estadoPet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Estado
                    </label>
                    <select
                        id="estadoPet"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="flowbite.com"
                        required
                    >
                        <option value="">PE</option>
                        <option value="1">AL</option>
                        <option value="2">SE</option>
                        <option value="3">CE</option>
                    </select>
                </div>
                <div>
                    <label for="cidadePet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Cidade{" "}
                    </label>
                    <input
                        type="text"
                        id="cidadePet"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                    />
                </div>
            </div>
            <div className="mb-6">
                <label for="descricaoPet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Descricao
                </label>
                <textarea
                    id="descricaoPet"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john.doe@portePet.com"
                    required
                />
            </div>
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Fazer upload de fotos{" "}
                    </label>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Upload
                    </button>
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
