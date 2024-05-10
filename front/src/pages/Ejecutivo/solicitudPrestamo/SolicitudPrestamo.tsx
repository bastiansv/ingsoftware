import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/dataTable/DataTable"
import FormSolicitudes from "../../../components/ejecutivo/formSolicitudes/FormSolicitudes"
import { useState } from "react";
import "./solicitudPrestamo.scss"

interface Rows {
    id: number,
    nCuota: number,
    fechaVencimiento: string,
    montoUF: number
}

interface dataFromChildInterface {
    id_simulacion: number,
    cuotas: Rows[]
}

const SolicitudPrestamo = () => {

    const [dataFromChild, setDataFromChild] = useState<dataFromChildInterface>({ id_simulacion: 0, cuotas: [] });
    const [modal, setModal] = useState<boolean>(false);
    const [rows, setRows] = useState<Rows[]>([]);

    const columns: GridColDef[] = [
        { field: 'cuota', headerName: 'Número de Cuota', width: 150, flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'fecha', headerName: 'Fecha de Pago', width: 150, flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'monto', headerName: 'Monto en UF', width: 150, flex: 1, headerAlign: 'center', align: 'center' },
    ];

    const handleDataFromChild = (data: any) => {
        setDataFromChild(data); //En DataFromChild se guarda la data que viene del componente hijo
        setRows(dataFromChild.cuotas); //Se setea la data en rows para mostrarla en la tabla
    };

    return (
        <div className="solicitudPrestamo">
            <div className="solicitud--header">
                <h1>Simulación de Préstamo</h1>
            </div>
            <FormSolicitudes setModal={setModal} sendDataToParent={handleDataFromChild} />

            <div className="solicitud--header">
                <h1>Detalles simulación</h1>
            </div>
            {!modal && <div className="solicitud--noData">Primero debes realizar una simulación</div>}
            {modal && <>
                <DataTable rows={rows} columns={columns} id="id" />
                <div className="solicitud--solicitar">
                    <div className="solicitud--solicitar--buttons">
                        <button>Solicitar Préstamo</button>
                    </div>
                </div>
            </>}

        </div>
    )
}

export default SolicitudPrestamo