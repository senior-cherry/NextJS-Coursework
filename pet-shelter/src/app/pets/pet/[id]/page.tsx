import {PetType} from "@/types/types";
import {Button, ButtonGroup, Image} from "@chakra-ui/react";
import AdoptButtonGroup from "@/app/components/AdoptButtonGroup";
import Link from "next/link";

const getData = async (id: string) => {
    const res = await fetch(`${process.env.PRODUCTION_URL}/api/pets/${id}`, {
        cache: "no-store"
    })

    return res.json();
}

type Props = {
    params: {id: string}
}

const SinglePet = async ({params}: Props) => {
    const pet: PetType = await getData(params.id);

    const checkGender = () => {
        if (pet.gender === "Самець" || pet.gender === "Хлопчик") {
            return "blue";
        } else if (pet.gender === "Самка" || pet.gender === "Дівчинка") {
            return "pink";
        } else {
            return "crimson"
        }
    }

    return (
    <div className="main-wrapper">
        <div className="container">
            <div className="pet-container">
                <div className="pet-container-left">
                    <div className="img-container">
                        <Image src={`/uploads/${pet.imageUrl}`} alt={pet.imageUrl} />
                    </div>
                </div>
                <div className="pet-container-right">
                    <span className="pet-title">{pet.name}</span>
                    <span>Вид: {pet.species}</span>
                    <span>Вік: {pet.age}</span>
                    <span style={{color: checkGender()}}>Стать: {pet.gender}</span>
                    <p className="pet-description">
                        {pet.desc}
                    </p>
                        <ButtonGroup spacing='2' className="mt-5">
                            <div>
                                <AdoptButtonGroup pet={pet.name} imageUrl={pet.imageUrl} />
                            </div>
                            <Link href="/pets">
                                <Button variant='ghost' colorScheme='blue'>
                                    Назад
                                </Button>
                            </Link>
                        </ButtonGroup>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SinglePet;