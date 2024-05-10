import { useNavigate } from "react-router-dom"
import "./navbar.scss"

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className='navbar'>
            <div className="navbarEjecutivo--logo">
                <img src="/bank.svg" alt="" />
                
                <h1>Financiera La Clave</h1>
            </div>

            <ul>
                <li onClick={()=>navigate("/supervisor/cotizaciones")}>
                    <img src="/list3.svg" alt="" />
                    <p>Cotizaciones</p>
                </li>
                <li onClick={()=>navigate("/supervisor/solicitudes")}>
                    <img src="/pending2.svg" alt="" />
                    <p>Solicitudes pendientes</p>
                </li>
                <li>
                    <img src="/correct.svg" alt="" />
                    <p>Solicitudes resueltas</p>
                </li>
            </ul>

            <div className="navbarEjecutivo--user">
                Bienvenido, Supervisor!
            </div>
        </div>
    )
}

export default Navbar