import {PetType} from "@/types/types";
import PetLayout from "@/app/layouts/PetLayout";
import {Card, CardBody, CardFooter} from "@chakra-ui/card";
import {Button, ButtonGroup, Divider, Heading, Image, Stack, Text} from "@chakra-ui/react";
import Link from "next/link";

const getData = async (category: string) => {
    const res = await fetch(`http://localhost:3000/api/pets?cat=${category}`, {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("Failed");
    }

    return res.json();
}

type Props = {
    params: {category: string}
}

const PetsByCategory = async ({params}: Props) => {
    const pets: PetType[] = await getData(params.category);
    return (
        <PetLayout>
            <div className="mt-12">
                {pets.map((pet) => {
                    return (
                        <Card maxW='sm'>
                            <CardBody>
                                <Image
                                    src={`/uploads/${pet.imageUrl}`}
                                    alt={pet.imageUrl}
                                    borderRadius='lg'
                                />
                                <Stack mt='6' spacing='3'>
                                    <Link href={`/pets/${pet.id}`} className="hover:text-orange-500">
                                        <Heading size='md'>{pet.name}</Heading>
                                    </Link>
                                    <Text>
                                        {pet.species}
                                    </Text>
                                    <Text color='blue.600' fontSize='2xl'>
                                        {pet.age}
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <ButtonGroup spacing='2'>
                                    <Button variant='solid' colorScheme='blue'>
                                        Adopt now
                                    </Button>
                                    <Button variant='ghost' colorScheme='blue'>
                                        Add to favorites
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </PetLayout>
    );
};

export default PetsByCategory;