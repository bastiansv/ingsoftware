import { GridColDef } from "@mui/x-data-grid";
import "./modal.scss"
import DataTable from "../dataTable/DataTable";

interface Props {
    setModal: (modal:boolean) => void
}

const columns: GridColDef[] = [
    { field: 'cuota', headerName: 'Número de Cuota', width: 150,flex:1, headerAlign: 'center', align: 'center'},
    { field: 'fecha', headerName: 'Fecha de Pago', width: 150,flex:1, headerAlign: 'center', align: 'center'},
    { field: 'monto', headerName: 'Monto en UF', width: 150,flex:1, headerAlign: 'center', align: 'center' },
];

const rows = [
    { id: 1, cuota: 'Cuota 1', fecha: '01/01/2022', monto: '10 UF' },
    { id: 2, cuota: 'Cuota 2', fecha: '01/02/2022', monto: '10 UF' },
    { id: 3, cuota: 'Cuota 3', fecha: '01/03/2022', monto: '10 UF' },
    { id: 4, cuota: 'Cuota 4', fecha: '01/04/2022', monto: '10 UF' },
    { id: 5, cuota: 'Cuota 5', fecha: '01/05/2022', monto: '10 UF' },
    { id: 6, cuota: 'Cuota 6', fecha: '01/06/2022', monto: '10 UF' },
];

const Modal = (props:Props) => {
    return (
        <div className="modal">
            <div className="modal--box">
                <div className="modal--content">
                    <div className="modal--close" onClick={()=>{props.setModal(false)}}>
                        <img src="/close.svg" alt="" />

                    </div>
                    <h1>Detalles de la simulación</h1>
                    <DataTable columns={columns} rows={rows}/>
                    <div className="modal--buttons">
                        <button className="eliminar">Eliminar solicitud</button>
                        <button className="aceptar">Solicitar préstamo</button>
                    </div>

                </div>
                
            </div>
        </div>
    )
}

export default Modal