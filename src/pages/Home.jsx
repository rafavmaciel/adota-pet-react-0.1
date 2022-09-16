import React from "react";
import "./style/home.css";
import PetCard from "../components/PetCard";
import { db } from "../config/firebase";
import { useState, useEffect, useContext } from "react";
import { collection, onSnapshot, where } from "firebase/firestore";
import LateralSearch from "../components/LateralSearch";
import UserContext from "../redux/UserReducer";


export default function Home() {
    const { state, dispatch } = useContext(UserContext);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);


    const getPets = async () => {
        console.log(state.filtrosPesquisa);
        onSnapshot(collection(db, "pets"), (snapshot) => {
            setPets(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
    };

    function filterPets() {
         // fazer o filter com o state.filtrosPesquisa
         let petFiltrados = pets.filter((pet) => {
            if (state.filtrosPesquisa.estadoPet != null) {
                return pet.estadoPet == state.filtrosPesquisa.estadoPet;
            }
        });
        setPets(petFiltrados);
        console.log(pets);
    }


    useEffect(() => {
        getPets();
        filterPets();
    }, [state]);

    return (
        <>
            <div className="Home">
                <div className="PetCards-home">
                    <div className="flex flex-row">
                        <div className="flex fle-col-3 place-items-start mt-20">
                            <LateralSearch />
                        </div>
                        <div className="col-9">
                            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                                {pets.map((pet, i) => (
                                    <PetCard
                                        key={i}
                                        id={pet.id}
                                        title={pet.nomePet}
                                        description={pet.descricaoPet}
                                        img={pet.imgPrincipal}
                                        cidade={pet.cidadePet}
                                        estado={pet.estadoPet}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
