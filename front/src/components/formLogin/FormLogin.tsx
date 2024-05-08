import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./formLogin.scss"
import toast from 'react-hot-toast';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      localStorage.setItem('userData', JSON.stringify(response.data));
      toast.success('Inicio de sesión exitoso');
      switch (response.data.role) {
        case 'ejecutivo':
            navigate('/ejecutivo'); 
        break;
        case 'analista':
            navigate('/analista');
          break;
        case 'gerente':
            navigate('/gerente');
          break;
        default:
          toast.error('Error de rol');
      }
    } catch (error: any) {
      console.error(error);1
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error al iniciar sesión');
      }
    }
  };

  return (
    <div className="formLogin">
        <div className="header--login">
            <h1>Iniciar sesion</h1>
            <hr />
        </div>
        <form className="form--login" onSubmit={handleSubmit}>
            <div className="form--login--item">
                <label>Usuario:</label>
                <input type="text" placeholder="Ingresa tu nombre de usuario" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form--login--item">
                <label>Contraseña:</label>
                <input type="password" placeholder="Ingresa aquí tu contraseña" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Ingresar</button>
        </form>
    </div>
  )
}

export default FormLogin