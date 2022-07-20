import React from "react";
import "./style/home.css";
import PetCard from "../components/PetCard";

export default function Home() {
    return (
        <>
            <div className="Home">
                <div className="PetCards-home">
                <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    <PetCard
                        img="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                        title="Gato raguento"
                        description="só come o que gosta, passa dez dias fora de casa"
                        local="Sanaharó, Brasil"
                    />
                    <PetCard
                        img="https://images.unsplash.com/photo-1609769344832-c10f12a4bcd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                        title="Cachorrin"
                        description="O melhor amigo do homem"
                        local="Sanaharó, Brasil"
                    />
                    <PetCard
                        img="https://images.unsplash.com/photo-1612805273235-3f2e6120bbde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
                        title="Gomes "
                        description="Meu dono é um estelionatário "
                        local="Catende, Brasil"
                    />
                    
                    <PetCard
                        img="https://images.unsplash.com/photo-1518887371124-412923b6ccff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        title="Raul "
                        description="Parece com o dono "
                        local="Catende, Brasil"
                    />
                    </div>
                </div>
            </div>
        </>
    );
}
