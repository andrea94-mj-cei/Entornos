import {Select} from '@/components/Select';
import {Input} from '@/components/Input';
import { useState } from 'react';
const URL = import.meta.env.VITE_API_URL;

const RedactarCorreo = () => {
    const [formData, setFormData] = useState({
        remitente_id: "",
        destinatario_id: "",
        asunto: "",
        contenido: "",
    });

    const [errores, setErrores] = useState({});

    const fetchData = async () => {
        try {
            const response = await fetch(`${URL}/nuevo`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            // const objeto = await response.json();
            // console.log(data);

        } catch (error) {
            console.log("Error al hacer el fetch de los posts:", error);
        }
    }

    const validateForm = () => {
        const objetoErrores = {};
        // if (!formData.remitente_id) objetoErrores.remitente_id = "Debes ingresar un remitente_id";
        // if (!formData.destinatario_id) objetoErrores.destinatario_id = "Debes ingresar un destinatario_id";
        if (!formData.asunto) objetoErrores.asunto = "Debes ingresar un asunto";
        if (!formData.contenido) objetoErrores.contenido = "Debes ingresar un contenido";
        return objetoErrores;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
        const listaErrores = validateForm();
        // si existe algún error, guardarlo en errores
        // si no, mostrar resultado por consola
        if (Object.keys(listaErrores).length === 0) {
            console.log("Datos del formulario:", formData);
        } else {
            setErrores(listaErrores);
        }
    }

    const handleChange = (e) => {
        let { name, value } = e.target;

        // setFormData({ ...formData, [name]:value });
        setFormData(prevData => ({ ...prevData, [name]: value }));

        // Limpiar error cuando el usuario empieza a escribir/seleccionar
        setErrores(prevErrores => ({ ...prevErrores, [name]: "" }))
    }

    const listaRemitentes = [
        // Hacer un map. Para esto hat que hacer un useEffect que haga un fetch a la base de datos y traiga los datos de la tabla remitentes_id
        {value: "1", label: "Marta"},
        {value: "2", label: "Jorge"},
        {value: "3", label: "Laura"},
        {value: "4", label: "Juan"},
    ];

    const listadestinatarios = [
        // Hacer un map. Para esto hat que hacer un useEffect que haga un fetch a la base de datos y traiga los datos de la tabla destinatarios_id
        // Por ahora lo dejamos así
        {value: "1", label: "Marta"},
        {value: "2", label: "Jorge"},
        {value: "3", label: "Laura"},
        {value: "4", label: "Juan"},
    ];

    return (
        <form onSubmit={handleSubmit} className='Card'>
            <h2>Nuevo correo</h2>
            {/* Select de rango de edad  */}
            <Select
                name="remitente_id"
                label="De:"
                firstOptionLabel="Elige un remitente"
                value={formData.remitente_id}
                onChange={handleChange}
                lista={listaRemitentes}
                error={errores.remitente_id}
                // className="cssForm"
            />

            {/* select de destinatario*/}
            <Select
                name="destinatario_id"
                label="Para:"
                firstOptionLabel="Elige un destinatario"
                value={formData.destinatario_id}
                onChange={handleChange}
                lista={listadestinatarios}
                error={errores.destinatario_id}
                // className="cssForm"
            />

            {/* input de asunto */}
            <Input
                name="asunto"
                label="Título:"
                type="text"
                value={formData.asunto}
                onChange={handleChange}
                error={errores.asunto}
            // className="Form"
            />

            <Input
                name="contenido"
                label="contenido:"
                value={formData.contenido}
                onChange={handleChange}
                // className="cssForm"
                error={errores.contenido}
            />
            <button type="submit">Enviar</button>
        </form>
    );
}

export default RedactarCorreo;