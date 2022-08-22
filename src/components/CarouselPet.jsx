import { Carousel } from "react-carousel-minimal";

export default function CarouselPet(props) {
        return(
            <Carousel
                            data={props.tratarImagem(props.imgPet)}
                            time={8000}
                            width="750px"
                            height="450px"
                            radius="0px"
                            slideNumber={true}
                            captionPosition="bottom"
                            automatic={false}
                            dots={true}
                            pauseIconColor="white"
                            pauseIconSize="40px"
                            slideBackgroundColor="darkgrey"
                            slideImageFit="cover"
                            thumbnails={true}
                            thumbnailWidth="100px"
                            style={{
                                textAlign: "center",
                                maxWidth: "850px",
                                maxHeight: "500px",
                                margin: "40px auto",
                            }}
                        />
        )
}