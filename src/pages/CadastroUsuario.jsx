import FormCadastroUsuario from '../components/FormCadastroUsuario';
export default function CadastroUsuario() {
    return (
        <div className="CadastroUsuario">
            <div className="max-w-2xl mx-auto bg-white p-16">
                <p className="mb-10 text-xl">Cadastro do Usuário</p>
                <FormCadastroUsuario />
            </div>
        </div>
    );
}