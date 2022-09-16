import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { estadosBrasileiros, tiposAnimais, porteAnimais } from "../content/dadosFormulario";
import { useState,useContext } from "react"; 
import UserContext from "../redux/UserReducer";


export default function LateralSearch(props) {
    const { state, dispatch } = useContext(UserContext);
    const [filtrosPet, setFiltrosPet] = useState({
        estadoPet: null,
        cidadePet: null,
        tipoPet: null,
        portePet: null,
    });

    function handleClick() {
        dispatch({ type: "SET_FILTROS_PESQUISA", payload: filtrosPet });
    }


    return (
        <Card className="w-60 max-h-96">
            <CardHeader color="blue" size="sm">
                <h2 className="text-white text-2xl px-2">Pesquisar</h2>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center my-1">
                        <Typography color="gray" size="sm">
                            <h2 className="text-gray-500 text-sm">Estado</h2>
                        </Typography>
                        <select className="w-40 h-10 border-2 border-gray-300 rounded-md" id="buscaEstado" onChange={(e) => setFiltrosPet({ ...filtrosPet, estadoPet: e.target.value })}>
                            {estadosBrasileiros.map((estado) => (
                                <option key={Object.keys(estado)}>{Object.values(estado)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col items-center my-1">
                        <Typography color="gray" size="sm">
                            <h2 className="text-gray-500 text-sm">Cidade</h2>
                        </Typography>
                        <input type="text" className="w-40 h-10 border-2 border-gray-300 rounded-md" />
                    </div>
                </div>
            </CardBody>
            <CardFooter>
                <button className="bg-black hover:bg-stone-300 text-white font-bold py-2 px-4 rounded" onClick={handleClick} >
                    Pesquisar
                </button>
            </CardFooter>
        </Card>
    );
}
