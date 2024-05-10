import "./navbar.scss"

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="navbarEjecutivo--logo">
                <img src="/bank.svg" alt="" />
                
                <h1>Financiera La Clave</h1>
            </div>

            <ul>
                <li>
                    <img src="/pending2.svg" alt="" />
                    <p>Solicitudes pendientes</p>
                </li>
                <li>
                    <img src="/correct.svg" alt="" />
                    <p>Solicitudes resueltas</p>
                </li>
            </ul>

            <div className="navbarEjecutivo--user">
                Bienvenido, Usuario!
            </div>
        </div>
    )
}

export default Navbar