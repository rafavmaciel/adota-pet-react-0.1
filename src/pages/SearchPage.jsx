import React from "react";
import "./style/home.css";
import PetCard from "../components/PetCard";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function SearchPage(props) {
    const { tipo } = useParams();

    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPets = async () => {
        onSnapshot(collection(db, "pets"), (snapshot) => {
            setPets(snapshot.docs.map((doc) => doc.data()));
            setLoading(false);
        });
    };

    useEffect(() => {
        getPets();
    }, []);
    return (
        <>
            <div className="Home">
                <div className="PetCards-home">
                    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                        {pets.map((pet,i ) => 
                            pet.tipoPet === tipo ? (
                                <PetCard
                                    key={i}
                                    title={pet.nomePet}
                                    description={pet.descricaoPet}
                                    img={pet.imgPrincipal}
                                    local={pet.localPet}
                                />
                            ) : null
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
