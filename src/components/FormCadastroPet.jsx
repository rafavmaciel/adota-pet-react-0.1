import { useState, useContext } from "react";
import { db, storage } from "../config/firebase";
import { doc, writeBatch } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { estadosBrasileiros, tiposAnimais, porteAnimais } from "../content/dadosFormulario";
import { useNavigate } from "react-router-dom";
import UserContext from "../redux/UserReducer";

export default function FormCadastroPet() {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const [imgUrlPrincipal, setImgUrlPrincipal] = useState("");
    const [imgsObj, setImgsObj] = useState([]);
    const [progress, setProgress] = useState(0);

    //funcção para gerar um id único
    function makeid(length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        var refs = [];
        try {
            // pega todas as imagens que foram selecionadas
            const files = e.target.fotosPet.files;
            const imgs = [];
            if (files.length > 0) {
                // pega a key de cada imagem
                Object.keys(files).forEach((key) => {
                    const file = files[key];
                    imgs.push(file);
                });
                let promessas = await Promise.all(
                    // para cada imagem, faz o upload e pega a url
                    imgs.map(async (image) => {
                        await new Promise((resolve, reject) => {
                        const imgRef = ref(storage, "images/" + image.name);
                        const uploadTask = uploadBytesResumable(imgRef, image);
                                uploadTask.on(
                                    "state_changed",
                                    (snapshot) => {
                                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                        setProgress(progress);
                                    },
                                    (error) => {
                                        console.log(error);
                                    },
                                    () => {
                                        getDownloadURL(uploadTask.snapshot.ref)
                                            .then((downloadURL) => {
                                                console.log("File available at", downloadURL);
                                                refs.push(downloadURL);
                                                resolve(refs);
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                                reject(error);
                                            });
                                    }
                            );
                        });
                    })
                );
            }

            // salva no banco de dados as informações do pet e o caminho das imagens
            const dataPet = {
                nomePet: e.target.nomePet.value,
                tipoPet: e.target.tipoPet.value,
                portePet: e.target.portePet.value,
                telefone: e.target.telefonePet.value,
                estadoPet: e.target.estadoPet.value,
                cidadePet: e.target.cidadePet.value,
                descricaoPet: e.target.descricaoPet.value,
                imgPet: refs || [],
                donoPet: state.user.user,
                // pega a url da imagem principal, se nao tiver, pega uma imagem padrão
                imgPrincipal:
                    refs[0] ||
                    "https://firebasestorage.googleapis.com/v0/b/pet-adoption-2c0f9.appspot.com/o/images%2Fpet.png?alt=media&token=8b8b0b0f-8b8c-4b8f-8b8c-4b8f8b8c4b8f",
            };

            const idPet = makeid(10);
            const batch = writeBatch(db);
            let petRef = doc(db, "pets", idPet);
            batch.set(petRef, dataPet);
            const userRef = doc(db, `users/${state.user.email}/pets/${idPet}`);
            batch.set(userRef, dataPet);

            await batch.commit();

            navigate("/");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} id="formCadastroPet">
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                    <label for="nomePet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Nome do pet
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
                        {tiposAnimais.map((tipo, i) => (
                            <option value={tipo} key={i}>
                                {tipo}
                            </option>
                        ))}
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
                        {porteAnimais.map((tipo, i) => (
                            <option value={tipo} key={i}>
                                {tipo}
                            </option>
                        ))}
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
                        required
                    >
                        {estadosBrasileiros.map((estado) => (
                            <option key={Object.keys(estado)}>{Object.values(estado)}</option>
                        ))}
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
                    wrap="hard"
                    cols={30}
                    rows={5}
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
