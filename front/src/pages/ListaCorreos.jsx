import { useState, useEffect } from "react";
const URL = import.meta.env.VITE_API_URL;
import Correo from "@/components/Correo";

const ListaCorreos = () => {
    const [listaCorreo, setListaCorreo ] = useState([]);

    useEffect(() => {
        fetchCorreos();
    }, []);

    const fetchCorreos = async () => {
        try {
            const respuesta = await fetch(`${URL}/correos`)
            const objeto = await respuesta.json();
            console.log(objeto);

            if (objeto.status == "error") {
                setUserError(`Tuvimos un error: ${objeto.msg}`)
                return;
            } 
            setListaCorreo(objeto);

        } catch (error) {
            console.log("Error al hacer el fetch de los correos :", error);
        }
    }


    const handleDelete = () => {
        fetchCorreos();
    }

    return (
        <>
            {
            listaCorreo.map((correo) => {
                return <Correo key={correo.id} {...correo} onChange={handleDelete}/>
            })
            }
        </>
    );
}

export default ListaCorreos;