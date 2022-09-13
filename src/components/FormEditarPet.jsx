import { db} from "../config/firebase";
import { doc, getDoc, writeBatch} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { estadosBrasileiros, tiposAnimais, porteAnimais } from "../content/dadosFormulario";
import UserContext from "../redux/UserReducer";
import { useNavigate } from "react-router-dom";

export default function FormEditarPet(props) {
    const navigate = useNavigate();
    const { state } = useContext(UserContext);
    const { idPet } = props;
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getPet() {
        try {
            const docRef = doc(db, "pets", idPet);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPet(docSnap.data());
                setLoading(false);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (error) {
            console.log("Error getting document:", error);
        }
    }

    useEffect(() => {
        getPet();
    }, []);

    async function handleUpdate(e) {
        try {
            e.preventDefault();
            const petUpdate = {
                nomePet: e.target.nomePet.value,
                tipoPet: e.target.tipoPet.value,
                portePet: e.target.portePet.value,
                telefone: e.target.telefonePet.value,
                estadoPet: e.target.estadoPet.value,
                cidadePet: e.target.cidadePet.value,
                descricaoPet: e.target.descricaoPet.value,
            };
            const batch = writeBatch(db);
            const petRef = doc(db, "pets", idPet);
            batch.update(petRef, petUpdate);
            const petUserRef = doc(db, `users/${state.user.email}/pets/${idPet}`);
            batch.update(petUserRef, petUpdate);
            await batch.commit();
            alert("Pet atualizado com sucesso!");
            navigate("/minhaConta");

        } catch (error) {
            console.log(error);
        }
    }

    function formPet() {
        return (
            <form onSubmit={handleUpdate} id="formCadastroPet">
                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                    <div>
                        <label
                            for="nomePet"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Nome do pet
                        </label>
                        <input
                            type="text"
                            id="nomePet"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={pet.nomePet}
                            onChange={(e) => setPet({ ...pet, nomePet: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="tipoPet"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Tipo do pet
                        </label>
                        <select
                            id="tipoPet"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Doe"
                            onChange={(e) => setPet({ ...pet, tipoPet: e.target.value })}
                            value={pet.tipoPet}
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
                        <label
                            for="portePet"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Porte do pet
                        </label>
                        <select
                            id="portePet"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Flowbite"
                            value={pet.portePet}
                            onChange={(e) => setPet({ ...pet, portePet: e.target.value })}
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
                            for="telefonePet"
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
                            value={pet.telefone}
                            onChange={(e) => setPet({ ...pet, telefone: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="estadoPet"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Estado
                        </label>
                        <select
                            id="estadoPet"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="flowbite.com"
                            onChange={(e) => setPet({ ...pet, estadoPet: e.target.value })}
                            value={pet.estadoPet}
                            required
                        >
                            {estadosBrasileiros.map((estado) => (
                                <option key={Object.keys(estado)}>{Object.values(estado)}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label
                            for="cidadePet"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Cidade{" "}
                        </label>
                        <input
                            type="text"
                            id="cidadePet"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            value={pet.cidadePet}
                            onChange={(e) => setPet({ ...pet, cidadePet: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label
                        for="descricaoPet"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Descricao
                    </label>
                    <textarea
                        id="descricaoPet"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@portePet.com"
                        wrap="hard"
                        cols={30}
                        rows={5}
                        value={pet.descricaoPet}
                        onChange={(e) => setPet({ ...pet, descricaoPet: e.target.value })}
                    />
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

    return <div>{loading ? <h1>Carregando...</h1> : formPet()}</div>;
}
