import "./navbarEjecutivo.scss"

const NavbarEjecutivo = () => {
  return (
    <div className="navbarEjecutivo">
        <div className="navbarEjecutivo--logo">
            <img src="/bank.svg" alt="" />
            <h1>Financiera La Clave</h1>
        </div>

        <div className="navbarEjecutivo--user">
            Bienvenido, Usuario!
        </div>
    </div>
  )
}

export default NavbarEjecutivo