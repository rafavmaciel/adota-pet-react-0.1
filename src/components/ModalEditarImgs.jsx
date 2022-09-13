import { db} from "../config/firebase";
import { doc, writeBatch} from "firebase/firestore";
import { useContext } from "react";
import UserContext from "../redux/UserReducer";

export default function ModalEditarImgs(props) {

    const { state } = useContext(UserContext);
    
    function handleClick(img){
        const batch = writeBatch(db);
        const petUserRef = doc(db, `users/${state.user.email}/pets/${props.idPet}`);
        batch.update(petUserRef, {
            imgPrincipal: img,
        });
        const petRef = doc(db, "pets", props.idPet);
        batch.update(petRef, {
            imgPrincipal: img,
        });
        batch.commit();
        alert("Imagem principal alterada com sucesso!");
        props.changeModal();
    }


    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => props.changeModal()}></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-2/3 p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="flex flex-row items-center justify-center">
                        {props.pet.imgPet.map((img, i) => (
                            <div className="mx-2 my-2 ">
                                <a key={i} onClick = {()=>handleClick(img)}  >
                                    <img key={i} src={img} style={{ width: "150px" }} alt="img-blur-shadow" className="hover:scale-105 hover:bg-blue-500 hover:border-2 hover:border-blue-500"/>
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="flex-end" >
                        <button className="bg-black hover:bg-stone-300 text-white font-bold py-2 px-4 rounded" onClick={() => props.changeModal()}>
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
