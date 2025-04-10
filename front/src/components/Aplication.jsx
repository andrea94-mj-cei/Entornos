const URLSTATIC = import.meta.env.VITE_STATIC_URL

const Aplication = ({icono, titulo, color}) => {
    return (
        <div className="Aplicaiones-div" style={{ backgroundColor: color }}>
            <img className="Aplicaiones-img" src={`${URLSTATIC}/svg/${icono}`} alt={icono} />
            <h3 className="Aplicaiones-h3">{titulo}</h3>
        </div>
    );
}

export default Aplication;