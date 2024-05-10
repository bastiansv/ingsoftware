import { GridColDef } from "@mui/x-data-grid"
import DataTable from "../../../components/dataTable/DataTable"
import "./listaSimulaciones.scss"
import { useState, useEffect } from "react";
import Modal from "../../../components/modal/Modal";
import { Button } from "@mui/material";
import axios from "axios";

interface Rows{
  id: number,
  userRut: string,
  totalAmount: number,
  startDate: string,
  endDate: string
}

const ListaSimulaciones = () => {

  const [rows, setRows] = useState<Rows[]>([]);
  const [modal, setModal] = useState(false);

  const response = async (userId: string) => { 
    const data = await axios.put('http://localhost:3000/simulations/all', { userId: userId, });
    setRows(data.data);
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    response(userData.id);
  }, []);

  const columns: GridColDef[] = [
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
      renderCell: () => (
        <Button variant="contained" color="primary" onClick={() => { setModal(true) }}>
          Ver Detalles
        </Button>
      ),
    },
  ];

  return (
    <div className="listaSimulaciones">
      <div className="simulaciones--header">
        <h1>Lista de simulaciones de préstamo</h1>
      </div>
      <DataTable columns={columns} rows={rows} id="id" />

      {modal && <Modal setModal={setModal} />}
    </div>
  )
}

export default ListaSimulaciones