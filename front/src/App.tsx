import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import "./styles/global.scss"
import LayoutEjecutivo from './pages/Ejecutivo/layout/LayoutEjecutivo'
import Home from './pages/Ejecutivo/home/Home'
import SolicitudPrestamo from './pages/Ejecutivo/solicitudPrestamo/SolicitudPrestamo'
import ListaSimulaciones from './pages/Ejecutivo/listaSimulaciones/ListaSimulaciones'
import ListaSolicitudes from './pages/Ejecutivo/listaSolicitudes/ListaSolicitudes'
import LayoutSupervisor from './pages/supervisor/layout/LayoutSupervisor'
import SolicitudesPrestamo from './pages/supervisor/solicitudesPrestamo/solicitudesPrestamo'
import Cotizaciones from './pages/supervisor/cotizaciones/Cotizaciones'


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
        <Route path='/supervisor' element={<LayoutSupervisor/>}>
          <Route path='/supervisor/solicitudes' element={<SolicitudesPrestamo/>}/>
          <Route path='/supervisor/cotizaciones' element={<Cotizaciones/>}/> 
        </Route>
      </Routes>
    </Router>
  )
}

export default App
