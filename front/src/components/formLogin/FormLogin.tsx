import "./formLogin.scss"

const FormLogin = () => {
  return (
    <div className="formLogin">
        <div className="header--login">
            <h1>Iniciar sesion</h1>
            <hr />
        </div>
        <form className="form--login">
            <div className="form--login--item">
                <label>Usuario:</label>
                <input type="text" placeholder="Ingresa tu nombre de usuario" />
            </div>
            <div className="form--login--item">
                <label>Contraseña:</label>
                <input type="password" placeholder="Ingresa aquí tu contraseña" />
            </div>
            <button>Ingresar</button>
        </form>
    </div>
  )
}

export default FormLogin