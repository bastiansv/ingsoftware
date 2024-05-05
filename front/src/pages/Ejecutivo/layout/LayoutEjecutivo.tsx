import { Outlet } from "react-router-dom"
import MenuEjecutivo from "../../../components/ejecutivo/menu/MenuEjecutivo"
import NavbarEjecutivo from "../../../components/ejecutivo/navbar/NavbarEjecutivo"
import "./layoutEjecutivo.scss"

const LayoutEjecutivo = () => {
  return (
    <div className="layoutEjecutivo">
        <div className="ejecutivo--navbar">
            <NavbarEjecutivo/>
        </div>
        <div className="ejecutivo--main">
            <div className="ejecutivo--menu--container">
              <MenuEjecutivo/>
            </div>
            <div className="ejecutivo--content--container">
              <Outlet/>
            </div>

        </div>
    </div>
  )
}

export default LayoutEjecutivo