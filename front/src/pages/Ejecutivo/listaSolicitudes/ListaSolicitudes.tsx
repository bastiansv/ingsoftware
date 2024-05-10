import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/dataTable/DataTable";
import "./listaSolicitudes.scss"
import { useState, useEffect } from "react";
import axios from "axios";

interface Rows{
  id: number,
  userRut: string,
  totalAmount: number,
  startDate: string,
  endDate: string
}

const ListaSolicitudes = () => {

    const [rows, setRows] = useState<Rows[]>([]);

    const columns: GridColDef[] = [
        { field: 'userRut', headerName: 'Rut solicitante', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'totalAmount', headerName: 'Monto Solicitado', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'startDate', headerName: 'Fecha de Inicio', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'endDate', headerName: 'Fecha de Término', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'estado', headerName: 'Estado', flex: 1, align: 'center', headerAlign: 'center', 
          cellClassName: (params:any) => {
            const estado = params.value as string;
            let className = '';
            if (estado === 'Aprobado') {
              className = 'aprobado';
            } else if (estado === 'Pendiente') {
              className = 'pendiente';
            } else if (estado === 'Rechazado') {
              className = 'rechazado';
            }
            return "estado "+className;
          }
        },
    ];

    const response = async (userId: string) => { 
      const data = await axios.put('http://localhost:3000/solicitudesbyId', { userId: userId, });
      setRows(data.data);
    }
  
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      response(userData.id);
    }, []);

    return (
        <div className="listaSolicitudes">
            <div className="solicitudes--header">
                <h1>Lista de solicitudes de préstamo</h1>
            </div>
            <DataTable rows={rows} columns={columns}/>
        </div>
    )
}

export default ListaSolicitudes