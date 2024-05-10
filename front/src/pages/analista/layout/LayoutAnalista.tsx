import "./layoutAnalista.scss"
import NavbarAnalista from "../../../components/analista/navbar/Navbar"
import { Outlet } from "react-router-dom"

const LayoutAnalista = () => {
    return (
        <div className="layoutAnalista">
            <div className="analista--navbar">
                <NavbarAnalista />
            </div>
            <div className="analista--main">
                <div className="analista--content--container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default LayoutAnalista