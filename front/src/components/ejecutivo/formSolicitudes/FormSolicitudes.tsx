import React, { useState } from 'react';
import axios from 'axios';
import "./formSolicitudes.scss"

interface Rows {
    id: number,
    nCuota: number,
    fechaVencimiento: string,
    montoUF: string
}

interface ChildProps {
    setRows: (data: Rows[]) => void;
    setTable: (data: boolean) => void;
}

const FormSolicitudes: React.FC<ChildProps> = ({setRows,setTable}) => {
    const [rut, setRut] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [amount, setAmount] = useState(0);
    const [interest, setInterest] = useState(0);

    const sendDataToParentOnClick = async () => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');

        const response = await axios.post('http://localhost:3000/simulations', {
            userId: userData.id,
            userRut: rut,
            totalAmount: amount,
            startDate,
            endDate,
            interestRate: interest
        });
        setRows(response.data.cuotas);
        setTable(true);
    };

    return (
        <div className="formSolicitudes">
            <form action="">
                <div className="form--content">
                    <div className="form--section">
                        <div className="form--item">
                            <label htmlFor="nombre">Rut solicitante:</label>
                            <input type="text" name="rut" id="rut" value={rut} onChange={e => setRut(e.target.value)}/>
                        </div>
                        <div className="form--item">
                            <label htmlFor="fechasolicitud">Fecha inicio:</label>
                            <input type="date" name="fechasolicitud" id="fechasolicitud" value={startDate} onChange={e => setStartDate(e.target.value)}/>
                        </div>
                        <div className="form--item">
                            <label htmlFor="fechafin">Fecha fin:</label>
                            <input type="date" name="fechafin" id="fechafin" value={endDate} onChange={e => setEndDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form--section">
                        <div className="form--item">
                            <label htmlFor="monto">Monto:</label>
                            <input type="number" name="monto" id="monto" value={amount} onChange={e => setAmount(Number(e.target.value))}/>
                        </div>
                        <div className="form--item">
                            <label htmlFor="interes">Interés:</label>
                            <input type="number" name="interes" id="interes" value={interest} onChange={e => setInterest(Number(e.target.value))}/>
                        </div>
                    </div>
                </div>
                <div className="form--button">
                    <button type="button" onClick={sendDataToParentOnClick}>Simular</button>
                </div>
            </form>
        </div>
    )
}

export default FormSolicitudes