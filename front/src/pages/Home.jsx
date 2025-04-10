import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import Section from "@/components/Section";
import Client from "@/components/Client";
import Aplication from "@/components/Aplication";
const URL = import.meta.env.VITE_API_URL;

// Crear valor inicial (formularios) o imprimirlo si no existe (si muestra el valor en pantalla).
const Home = () => {
    const [data, setData] = useState({
        clients:[],
        aplications:[]
    });

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            const response = await fetch(`${URL}/home`);
            const objeto = await response.json();
            console.log(objeto.data);

            if (objeto.status == "error") {
                setUserError(`Tuvimos un error: ${objeto.msg}`)
                return;
            } 
            setData(objeto.data);

        } catch (error) {
            console.log("Error al hacer el fetch de los corrreos:", error);
        }
    }

    const { hero, sections, aplications, clients } = data;

    return (
        <div>
            {
            hero && 
            <Hero {...hero} />
            }
            { sections &&
            sections.map((section) => {
                return <Section key={section.id} {...section} />
            })
            }
            <article className="Aplicaiones">
                <div className="Aplicaciones-container">
                    {
                    aplications.map((aplication) => {
                        return <Aplication key={aplication.id} {...aplication} />
                    })
                    }
                </div>
            </article>
            <article className="Clients">
                <div className="Clients-container">
                    {
                    clients.map((client) => {
                        return <Client key={client.id} {...client} />
                    })
                    }
                </div>
            </article>
        </div>
    );
}

export default Home;