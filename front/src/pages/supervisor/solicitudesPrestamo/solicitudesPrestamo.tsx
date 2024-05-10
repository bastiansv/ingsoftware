import { Button } from "@mui/material";
import "./solicitudesPrestamo.scss"
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/dataTable/DataTable";

const columns: GridColDef[] = [
    { field: 'id_ejecutivo', headerName: 'ID Ejecutivo', flex: 1, align: 'center',headerAlign: 'center'},
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
        <>
          <Button variant="contained" style={{background:"#419444"}} >
            Aceptar
          </Button>
          <Button variant="contained" style={{background:"#cf372c"}}>
            Rechazar
          </Button>
          <Button variant="contained" style={{background:"#daa609"}}>
            Derivar
          </Button>
        </>
      ),
    },
  ];

  const rows = [
    { id: 1, id_ejecutivo: 123, userRut: '12345678-9', totalAmount: 1000000, startDate: '2022-01-01', endDate: '2022-01-31' },
    { id: 2, id_ejecutivo: 456, userRut: '98765432-1', totalAmount: 500000, startDate: '2022-02-01', endDate: '2022-02-28' },
    { id: 3, id_ejecutivo: 789, userRut: '45678901-2', totalAmount: 2000000, startDate: '2022-03-01', endDate: '2022-03-31' },
    { id: 4, id_ejecutivo: 101, userRut: '21098765-4', totalAmount: 1500000, startDate: '2022-04-01', endDate: '2022-04-30' },
    { id: 5, id_ejecutivo: 112, userRut: '54321098-7', totalAmount: 800000, startDate: '2022-05-01', endDate: '2022-05-31' },
    { id: 6, id_ejecutivo: 131, userRut: '87654321-0', totalAmount: 3000000, startDate: '2022-06-01', endDate: '2022-06-30' },
    { id: 7, id_ejecutivo: 415, userRut: '10987654-3', totalAmount: 1200000, startDate: '2022-07-01', endDate: '2022-07-31' },
    { id: 8, id_ejecutivo: 161, userRut: '43210987-6', totalAmount: 2500000, startDate: '2022-08-01', endDate: '2022-08-31' },
    { id: 9, id_ejecutivo: 718, userRut: '76543210-9', totalAmount: 900000, startDate: '2022-09-01', endDate: '2022-09-30' },
    { id: 10, id_ejecutivo: 192, userRut: '09876543-2', totalAmount: 1800000, startDate: '2022-10-01', endDate: '2022-10-31' },
  ];

const SolicitudesPrestamo = () => {
    return (
        <div className="solicitudesPrestamo">
            <div className="solicitudes--header">
                <h1>Solicitudes de préstamo</h1>
            </div>
            
            <DataTable columns={columns} rows={rows}/>
            
        </div>
    )
}

export default SolicitudesPrestamo