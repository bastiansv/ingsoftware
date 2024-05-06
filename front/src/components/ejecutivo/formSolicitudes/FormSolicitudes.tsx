import "./formSolicitudes.scss"

const FormSolicitudes = () => {
  return (
    <div className="formSolicitudes">
        <form action="">
            <div className="form--content">
                <div className="form--section">
                    <div className="form--item">
                        <label htmlFor="nombre">Rut solicitante:</label>
                        <input type="text" name="rut" id="rut"/>
                    </div>
                    <div className="form--item">
                        <label htmlFor="fechasolicitud">Fecha inicio:</label>
                        <input type="date" name="fechasolicitud" id="fechasolicitud"/>
                    </div>
                    <div className="form--item">
                        <label htmlFor="fechafin">Fecha fin:</label>
                        <input type="date" name="fechafin" id="fechafin"/>
                    </div>
                </div>
                <div className="form--section">
                    <div className="form--item">
                        <label htmlFor="monto">Monto:</label>
                        <input type="number" name="monto" id="monto"/>
                    </div>
                    <div className="form--item">
                        <label htmlFor="interes">Interés:</label>
                        <input type="number" name="interes" id="interes"/>
                    </div>
                    <div className="form--item">
                        <label htmlFor="uf">Valor UF actual:</label>
                        <input type="number" name="uf" id="uf"/>
                    </div>
                </div>
            </div>
            <div className="form--button">
                <button>Simular</button>
            </div>
        </form>
    </div>
  )
}

export default FormSolicitudes