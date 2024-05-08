import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/dataTable/DataTable"
import FormSolicitudes from "../../../components/ejecutivo/formSolicitudes/FormSolicitudes"
import { useState } from "react";
import "./solicitudPrestamo.scss"

interface Rows{
    id: number,
    nCuota: number,
    fechaVencimiento: string,
    montoUF: number
}

interface dataFromChildInterface{
    id_simulacion: number,
    cuotas: Rows[]
}

const SolicitudPrestamo = () => {

    const [dataFromChild, setDataFromChild] = useState<dataFromChildInterface>({id_simulacion: 0, cuotas: []});

    const columns: GridColDef[] = [
        { field: 'cuota', headerName: 'Número de Cuota', width: 150,flex:1, headerAlign: 'center', align: 'center'},
        { field: 'fecha', headerName: 'Fecha de Pago', width: 150,flex:1, headerAlign: 'center', align: 'center'},
        { field: 'monto', headerName: 'Monto en UF', width: 150,flex:1, headerAlign: 'center', align: 'center' },
    ];

    /*const rows = [
        { id: 1, cuota: 'Cuota 1', fecha: '01/01/2022', monto: '10 UF' },
        { id: 2, cuota: 'Cuota 2', fecha: '01/02/2022', monto: '10 UF' },
        { id: 3, cuota: 'Cuota 3', fecha: '01/03/2022', monto: '10 UF' },
        { id: 4, cuota: 'Cuota 4', fecha: '01/04/2022', monto: '10 UF' },
        { id: 5, cuota: 'Cuota 5', fecha: '01/05/2022', monto: '10 UF' },
        { id: 6, cuota: 'Cuota 6', fecha: '01/06/2022', monto: '10 UF' },
    ];*/

    const [rows, setRows] = useState<Rows[]>([]);

    const handleDataFromChild = (data: any) => {
        setDataFromChild(data); //En DataFromChild se guarda la data que viene del componente hijo
    };

    return (
        <div className="solicitudPrestamo">
            <div className="solicitud--header">
                <h1>Simulación de Préstamo</h1>
            </div>
            <FormSolicitudes sendDataToParent={handleDataFromChild}/>
            <div className="solicitud--header">
                <h1>Detalles simulación</h1>
            </div>
            <DataTable rows={rows} columns={columns} id="id" />
            <div className="solicitud--solicitar">
                <div className="solicitud--solicitar--buttons">
                    <button>Solicitar Préstamo</button>
                </div>
            </div>
        </div>
    )
}

export default SolicitudPrestamo