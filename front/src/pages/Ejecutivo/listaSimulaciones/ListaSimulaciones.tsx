import { GridColDef } from "@mui/x-data-grid"
import DataTable from "../../../components/dataTable/DataTable"
import "./listaSimulaciones.scss"
import { Button } from "@mui/material";

const ListaSimulaciones = () => {

  const columns: GridColDef[] = [
    { field: 'userRut', headerName: 'Rut solicitante', flex: 1, align: 'center',headerAlign: 'center'},
    { field: 'totalAmount', headerName: 'Monto Solicitado', flex: 1,align: 'center',headerAlign: 'center'},
    { field: 'startDate', headerName: 'Fecha de Inicio', flex: 1,align: 'center',headerAlign: 'center'},
    { field: 'endDate', headerName: 'Fecha de Término', flex: 1, align: 'center',headerAlign: 'center'},
    { 
      field: 'acciones', 
      headerName: 'Acciones',
      cellClassName: 'acciones',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Button variant="contained" color="primary">
          Ver Detalles
        </Button>
      ),
    },
  ];

  const rows = [
    { id: 1, userRut: '12345678-9', totalAmount: 1000000, startDate: '2022-01-01', endDate: '2022-01-31' },
    { id: 2, userRut: '98765432-1', totalAmount: 500000, startDate: '2022-02-01', endDate: '2022-02-28' },
    { id: 3, userRut: '45678901-2', totalAmount: 2000000, startDate: '2022-03-01', endDate: '2022-03-31' },
    { id: 4, userRut: '21098765-4', totalAmount: 1500000, startDate: '2022-04-01', endDate: '2022-04-30' },
    { id: 5, userRut: '54321098-7', totalAmount: 800000, startDate: '2022-05-01', endDate: '2022-05-31' },
    { id: 6, userRut: '87654321-0', totalAmount: 3000000, startDate: '2022-06-01', endDate: '2022-06-30' },
    { id: 7, userRut: '10987654-3', totalAmount: 1200000, startDate: '2022-07-01', endDate: '2022-07-31' },
    { id: 8, userRut: '43210987-6', totalAmount: 2500000, startDate: '2022-08-01', endDate: '2022-08-31' },
    { id: 9, userRut: '76543210-9', totalAmount: 900000, startDate: '2022-09-01', endDate: '2022-09-30' },
    { id: 10, userRut: '09876543-2', totalAmount: 1800000, startDate: '2022-10-01', endDate: '2022-10-31' },
  ];

  return (
    <div className="listaSimulaciones">
      <div className="simulaciones--header">
        <h1>Lista de simulaciones de préstamo</h1>
      </div>
      <DataTable columns={columns} rows={rows} id="id" />
    </div>
  )
}

export default ListaSimulaciones