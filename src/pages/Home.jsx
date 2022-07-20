import React from "react";
import "./style/home.css";
import PetCard from "../components/PetCard";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { async } from "@firebase/util";

export default function Home() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPets = async () => {
      onSnapshot(collection(db, "pets"), (snapshot) => {
        setPets(snapshot.docs.map(doc => doc.data()));
        setLoading(false);
        console.log(snapshot.docs.map(doc => doc.data()));
           }
        );
    }

    useEffect(() => {
        getPets();
    }, []);
    return (
        <>
            <div className="Home">
                <div className="PetCards-home">
                    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                        {
                            pets.map((pet) => (
                                <PetCard
                                    title={pet.nomePet}
                                    description={pet.descricaoPet}
                                    img={pet.imgPet}
                                    local={pet.localPet}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
