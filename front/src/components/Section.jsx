const URLSTATIC = import.meta.env.VITE_STATIC_URL

const Section = ({ img, icono, color, titulo, contenido, isImageRight}) => {

    const lado = !isImageRight && "Left";

    return (
        <section className="Section" style={{ backgroundColor: color }}>
            <div className={`Section-container ${lado}`} style={{ backgroundColor: color }} >
                <div className="Section-right">
                    <img className="Section-hero-icon" src={`${URLSTATIC}/svg/${icono}`} alt="icono" />
                    <h1 className="Section-h1">{titulo}</h1>
                    <p className="Section-p">{contenido}</p>
                </div>
                <div className="Section-left">
                    <img className="Section-img" src={`${URLSTATIC}/img/${img}`} alt="hero" />
                </div>
            </div>
        </section>
    );
}

export default Section;