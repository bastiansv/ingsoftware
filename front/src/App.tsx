import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import "./styles/global.scss"
import LayoutEjecutivo from './pages/Ejecutivo/layout/LayoutEjecutivo'
import Home from './pages/Ejecutivo/home/Home'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ejecutivo" element={<LayoutEjecutivo />} >
          <Route path="/ejecutivo" element={<Home/>}/>
          <Route path="/ejecutivo/solicitud" element={<div>Solicitud</div>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
