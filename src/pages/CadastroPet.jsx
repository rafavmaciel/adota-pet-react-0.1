import FormCadastroPet from "../components/FormCadastroPet";
export default function CadastroPet() {
    return (
        <div className="CadastroPet">
            <div className="max-w-2xl mx-auto bg-white p-16">
                <p className="mb-10 text-xl">Cadastro do Pet</p>
                <FormCadastroPet />
            </div>
        </div>
    );
}
