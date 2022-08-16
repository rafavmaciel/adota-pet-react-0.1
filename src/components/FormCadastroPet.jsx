import { useState, useEffect, useReducer, useContext } from "react";
import { db, storage } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { async } from "@firebase/util";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function FormCadastroPet() {
    const [imgUrlPrincipal, setImgUrlPrincipal] = useState("");
    const [imgsObj, setImgsObj] = useState([]);
    const [progress, setProgress] = useState(0);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // pega todas as imagens que foram selecionadas
            const files = e.target.fotosPet.files;
            const imgs = [];
            const refs = [];
            // pega a key de cada imagem
            Object.keys(files).forEach((key) => {
                const file = files[key];
                imgs.push(file);
            });
            let promessas = Promise.all(
                // para cada imagem, faz o upload e pega a url
                imgs.map(async (image) => {
                    let storageRef = ref(storage, `images/${image.name}`);
                    let uploadTask = uploadBytesResumable(storageRef, image);
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setProgress(progress);
                        },
                        (error) => {
                            console.log(error);
                        },
                        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log(downloadURL);
                            refs.push(downloadURL);
                            setImgsObj((imgsObj) => [...imgsObj, downloadURL]);
                        }).catch((error) => {
                            console.log(error);
                        }),
                    );
                })
            );

            //esprema todas as promises serem resolvidas
            await promessas;
    
            // salva no banco de dados as informações do pet e o caminho das imagens
            await addDoc(collection(db, "pets"), {
                nomePet: e.target.nomePet.value,
                tipoPet: e.target.tipoPet.value,
                portePet: e.target.portePet.value,
                telefone: e.target.telefonePet.value,
                estadoPet: e.target.estadoPet.value,
                cidadePet: e.target.cidadePet.value,
                descricaoPet: e.target.descricaoPet.value,
                imgPet: refs,
                imgPrincipal: refs[0],
            }).then(() => {
                alert("Pet cadastrado com sucesso!");
            });
        } catch (error) {
            alert(error);
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
                        <option value="Cachorro">Cachorro</option>
                        <option value="Gato">Gato</option>
                        <option value="Papagaio">Papagaio</option>
                        <option value="Outros">Outros</option>
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
                    >
                        <option value="Choose">Choose...</option>
                        <option value="Pequeno">Pequeno</option>
                        <option value="Médio">Médio</option>
                        <option value="Grande">Grande</option>
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
                        placeholder="81999124678"
                        pattern="[0-9]{11}"
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
                />
            </div>
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Fazer upload de fotos{" "}
                    </label>
                    <input
                        type="file"
                        multiple
                        id="fotosPet"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>
            <div className="flex justify-end">
                {!imgUrlPrincipal && <progress className="progress" value={progress} max="100" />}
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
