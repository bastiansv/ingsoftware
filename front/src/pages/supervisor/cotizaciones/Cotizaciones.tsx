import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/dataTable/DataTable"
import "./cotizaciones.scss"
import { useEffect, useState } from "react";
import axios from "axios";

interface Rows{
    id: number,
    id_ejecutivo: number,
    userRut: string,
    totalAmount: number,
    startDate: string,
    endDate: string
  }

const Cotizaciones = () => {
    const [rows, setRows] = useState<Rows[]>([])

    const response = async () => {
        const data = await axios.get('http://localhost:3000/simulationsSupervisor');
        setRows(data.data);
    }

    useEffect(() => {
        response();
    }, [])
    const columns: GridColDef[] = [
        {field: 'id_ejecutivo', headerName: 'ID Ejecutivo', flex: 1, align: 'center', headerAlign: 'center'},
        { field: 'userRut', headerName: 'Rut solicitante', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'totalAmount', headerName: 'Monto Solicitado', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'startDate', headerName: 'Fecha de Inicio', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'endDate', headerName: 'Fecha de Término', flex: 1, align: 'center', headerAlign: 'center' },
      ];
    return (
        
        <div className='cotizaciones'>
            <h1>Cotizaciones por ejecutivos</h1>
            <DataTable columns={columns} rows={rows}/>
        </div>

    )
}

export default Cotizaciones