const URLSTATIC = import.meta.env.VITE_STATIC_URL;
const URL = import.meta.env.VITE_API_URL;

const Correo = ({onChange, id, asunto, contenido, leido, created_at, destinatario_id, remitente_id, image, remitente_nombre, remitente_email, destinatario_nombre, destinatario_email}) => {

    console.log("id_correo=id", id)
    const fetchDeleteCorreo = async () => {
        try {
            const respuesta = await fetch(`${URL}/correos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id_correo: id})
                
        })
            const objeto = await respuesta.json();
            console.log(objeto);
            onChange();

            if (objeto.status == "error") {
                setUserError(`Tuvimos un error: ${objeto.msg}`)
                return;
            } 

        } catch (error) {
            console.log("Error al hacer el fetch de los posts:", error);
        }
    }

    const handleOnClick = () => {
        fetchDeleteCorreo();
    }

    return (
        <section className="Correo">
            <div className="Correo-info">
                <div className="Correo-left">
                    <img className="Correo-img" src={`${URLSTATIC}img/${image}`} alt={remitente_nombre} />
                </div>
                <div className="Correo-right">
                    <div className="Correo-remitente">
                        <p><b>FROM: </b>{remitente_nombre}</p>
                        <p><i>{created_at}</i></p>
                    </div>
                    <div className="Correo-destinatario">
                        <p><b>TO: </b>{destinatario_nombre}</p>
                    </div>
                </div>
            </div>
            <div className="Correo-asunto">
                <h2 className="Correo-h2">{asunto}</h2>
            </div>

            <div className="Correo-contenido">
                <p>{contenido}</p>
            </div>
            <button onClick={handleOnClick}>Borrar</button>
        </section>
    );
}

export default Correo;