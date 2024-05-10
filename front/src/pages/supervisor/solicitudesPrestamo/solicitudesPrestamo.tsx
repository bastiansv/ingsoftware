import { Button } from "@mui/material";
import "./solicitudesPrestamo.scss"
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/dataTable/DataTable";
import { useEffect, useState } from "react";
import axios from "axios";

interface Rows {
  id: number,
  id_ejecutivo: number,
  userRut: string,
  totalAmount: number,
  startDate: string,
  endDate: string
}

const SolicitudesPrestamo = () => {
  const [rows, setRows] = useState<Rows[]>([])

  const columns: GridColDef[] = [
    { field: 'id_ejecutivo', headerName: 'ID Ejecutivo', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'userRut', headerName: 'Rut solicitante', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'totalAmount', headerName: 'Monto Solicitado', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'startDate', headerName: 'Fecha de Inicio', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'endDate', headerName: 'Fecha de Término', flex: 1, align: 'center', headerAlign: 'center' },
    {
      field: 'acciones',
      headerName: 'Acciones',
      cellClassName: 'acciones',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          <Button variant="contained" style={{ background: "#419444" }} >
            Aceptar
          </Button>
          <Button variant="contained" style={{ background: "#cf372c" }}>
            Rechazar
          </Button>
          <Button variant="contained" style={{ background: "#daa609" }}>
            Derivar
          </Button>
        </>
      ),
    },
  ];
  const response = async () => {
    const data = await axios.get('http://localhost:3000/infoSupervisor');
    setRows(data.data);
  }
  useEffect(() => {
    response()
  }, [])
  return (
    <div className="solicitudesPrestamo">
      <div className="solicitudes--header">
        <h1>Solicitudes de préstamo</h1>
      </div>

      <DataTable columns={columns} rows={rows} />

    </div>
  )
}

export default SolicitudesPrestamo