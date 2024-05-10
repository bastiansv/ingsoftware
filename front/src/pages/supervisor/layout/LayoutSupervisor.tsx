import "./layoutSupervisor.scss"
import NavbarSupervisor from "../../../components/supervisor/navbar/Navbar"
import { Outlet } from "react-router-dom"

const LayoutSupervisor = () => {
    return (
        <div className="layoutSupervisor">
            <div className="supervisor--navbar">
                <NavbarSupervisor />
            </div>
            <div className="supervisor--main">
                <div className="supervisor--content--container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default LayoutSupervisor