import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import "./styles/global.scss"
import LayoutEjecutivo from './pages/Ejecutivo/layout/LayoutEjecutivo'
import Home from './pages/Ejecutivo/home/Home'
import SolicitudPrestamo from './pages/Ejecutivo/solicitudPrestamo/SolicitudPrestamo'
import ListaSimulaciones from './pages/Ejecutivo/listaSimulaciones/ListaSimulaciones'
import ListaSolicitudes from './pages/Ejecutivo/listaSolicitudes/ListaSolicitudes'
import LayoutAnalista from './pages/analista/layout/LayoutAnalista'
import SolicitudesPrestamo from './pages/analista/solicitudesPrestamo/solicitudesPrestamo'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ejecutivo" element={<LayoutEjecutivo />} >
          <Route path="/ejecutivo" element={<Home/>}/>
          <Route path="/ejecutivo/solicitud" element={<SolicitudPrestamo/>}/>
          <Route path="/ejecutivo/simulaciones" element={<ListaSimulaciones/>}/>
          <Route path="/ejecutivo/solicitudes" element={<ListaSolicitudes/>}/>
        </Route>
        <Route path='/analista' element={<LayoutAnalista/>}>
          <Route path='/analista/solicitudes' element={<SolicitudesPrestamo/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
