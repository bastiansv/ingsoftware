import "./menuEjecutivo.scss" 

const MenuEjecutivo = () => {
  return (
    <div className="menuEjecutivo">
        <ul>
            <li>
                <img src="/home.svg" alt="" />
                <a href="/ejecutivo">Inicio</a>
            </li>
            <li>
                <img src="/loan.svg" alt="" />
                <a href="/ejecutivo/solicitud">Solicitud de Prestamo</a>
            </li>
        </ul>
    </div>
  )
}

export default MenuEjecutivo