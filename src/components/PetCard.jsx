import './card.css';
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
export default function PetCard(props) {
    return (

        <Card className="mt-8 ml-8 w-96 transition duration-500 hover:scale-105 hover:bg-blue-50 hover:focus:border-blue-100">
                        <CardHeader color="red" className="relative h-56 transition duration-500 hover:-translate-y-1.5 ">
                            <img src={props.img} alt="img-blur-shadow" className="h-full w-full" />
                        </CardHeader>
                        <CardBody className="text-center">
                            <Typography variant="h5" className="mb-2">
                                {props.title}
                            </Typography>
                            <Typography>
                            {props.description}
                            </Typography>
                        </CardBody>
                        <CardFooter divider className="flex items-center justify-between py-3">
                            <Typography variant="small" color="grey" className="flex gap-1">
                                <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
                                {props.local}
                            </Typography>
                        </CardFooter>
                    </Card>
    );
}
