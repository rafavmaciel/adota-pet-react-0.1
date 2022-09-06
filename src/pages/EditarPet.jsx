import FormEditarPet from "../components/FormEditarPet";
import { useParams } from "react-router-dom";


export default function EditarPet() {
    const { id } = useParams();
    return (
        <div className="EditarPet">
            <div className="max-w-2xl mx-auto bg-white p-16">
                <p className="mb-10 text-xl">Editar Pet</p>
                <FormEditarPet idPet = {id} />
            </div>
        </div>
    );
}