"use client";
import {redirect, useRouter} from "next/navigation";
import {useSession, useUser} from "@clerk/nextjs";
import {checkUserRole} from "@/utils/userUtils";
import {Button, useToast} from "@chakra-ui/react";

const DeleteButton = ({ id, collection }: { id: string, collection: string }) => {
    const {session} = useSession();
    const {isLoaded, user}  = useUser();
    const userRole = checkUserRole(session);

    const router = useRouter();
    const toast = useToast()

    if (isLoaded) {
        if (userRole !== "org:admin") {
            redirect("/")
        }
    }

    const handleDelete = async () => {
        const res = await fetch(`/api/${collection}/${id}`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            toast({
                title: 'Успіх',
                description: "Запит успішно виконано",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            setTimeout(() => {
                window.location.reload();
            }, 3000)
        } else {
            const data = await res.json();
            toast({
                title: 'Помилка',
                description: data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    };

    return (
        <Button colorScheme='red' onClick={handleDelete}>Видалити</Button>
    );
};

export default DeleteButton;