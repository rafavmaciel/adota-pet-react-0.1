import React from "react";
import "./style/home.css";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import CarouselPet from "../components/CarouselPet";

export default function DetalhesPet() {
    const { id } = useParams();
    //pet info
    const [pet, setPet] = useState({});
    const [loading, setLoading] = useState(true);

    const getPet = async () => {
        const petRef = doc(db, "pets", id);
        const pet = await getDoc(petRef);
        setPet(pet.data());
        setLoading(false);
    };

    function tratarImagem(arrayImgs) {
        return arrayImgs.map((img) => {
            return {
                image: img,
            };
        });
    }

    useEffect(() => {
        getPet();
    }, []);

    return loading ? (
        <div>Loading...</div>
    ) : (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">{pet.tipoPet}</h2>
                <h1 className="text-blue-700 text-3xl title-font font-medium mb-1">{pet.nomePet}</h1>
                <div className="flex mb-4">
                    <span className="text-gray-600 ml-3">Visto:</span>
                    <span className="text-gray-600 ml-3">60 vezes</span>
                </div>
                <div className="lg:w-full mx-auto flex flex-wrap ">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                    {pet.imgPet ? (
                        <CarouselPet tratarImagem={tratarImagem} imgPet={pet.imgPet} />
                    ) : (
                        <div className="flex justify-start">
                            <img
                                src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                                alt="pet"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    )}
                    </div>
                    <div className="col flex flex-col justify-center md:items-start md:text-left items-center text-center">
                    <div className=" lg:w-4/5 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 ">
                        <div className="row">
                            <span className="title-font font-medium text-2xl text-blue-700">
                                Porte do animal: 
                            </span>
                            <span className="title-font font-medium text-2xl text-gray-900 mx-2">
                                {pet.portePet}
                            </span>
                        </div>
                        <div className="row my-3">
                            <span className="title-font font-medium text-2xl text-blue-700">
                                Descrição:
                            </span>
                            <p className="leading-relaxed">{pet.descricaoPet}</p>
                        </div>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex">
                                <i className="fas fa-map-marker-alt fa-xl mt-[3px] " />
                                <span className="ml-2 text-gray-600 ">{pet.cidadePet}</span>
                                <span className="mx-2">{pet.estadoPet}</span>
                            </div>
                            <div className="flex ml-6 items-center">
                                <i className="fas fa-phone fa-xl mt-[3px] " />
                                <span className="ml-2 text-gray-600 ">{pet.telefone}</span>
                            </div>
                        </div>

                        <div className="flex">
                           {/* entrar em contato */}

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
