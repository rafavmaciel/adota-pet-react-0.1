import './style/card.css';
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";


export default function PetCard(props) {
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate("/detalhesPet/" + id)
    }
    function descriptionLength(description) {
        if (description.length > 100) {
            return description.substring(0, 100) + "...";
        } else {
            return description;
        }
    }    
    return (
        <Card className="mt-8 ml-8 xl:w-96 lg:w-90 md: w-80 transition duration-500 hover:scale-105 hover:bg-blue-50 hover:focus:border-blue-100" onClick={ e=>{handleClick(props.id) } } >
                        <CardHeader color="red" className="relative h-56 transition duration-500 hover:-translate-y-1.5 ">
                            <img src={props.img} alt="img-blur-shadow" className="h-full w-full" />
                        </CardHeader>
                        <CardBody className="text-center">
                            <Typography variant="h5" className="mb-2">
                                {props.title}
                            </Typography>
                            <Typography  >
                            {descriptionLength(props.description)}
                            </Typography>
                        </CardBody>
                        <CardFooter divider className="flex items-center justify-between py-3">
                            <Typography variant="small" color="grey" className="flex gap-1">
                                <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
                                {props.cidade}
                                <p className=''>{` - ${props.estado}`}</p>
                            </Typography>
                        </CardFooter>
                    </Card>
    );
}
