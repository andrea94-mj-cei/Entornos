import { Link } from "react-router";


const Header = () => {
    return (
        <header className="Header">
            <Link className="Header-a" to="/" >Home</Link>
            <Link className="Header-a" to="/correos" >Correos</Link>
            <Link className="Header-a" to="/nuevo" >Nuevo</Link>
        </header>
    );
}

export default Header;