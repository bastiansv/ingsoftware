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
                <a href="/ejecutivo/solicitud">Simular Préstamo</a>
            </li>
            <li>
                <img src="/list.svg" alt="" />
                <a href="/ejecutivo/simulaciones">Lista simulaciones</a>
            </li>
            <li>
                <img src="/list.svg" alt="" />
                <a href="/ejecutivo">Lista solicitudes</a>
            </li>
        </ul>
    </div>
  )
}

export default MenuEjecutivo