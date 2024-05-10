import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/dataTable/DataTable";
import "./listaSolicitudes.scss"

const ListaSolicitudes = () => {

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
            return className;
          }
        },
    ];

    const rows = [
        { id: 1, userRut: '12345678-9', totalAmount: 1000000, startDate: '2022-01-01', endDate: '2022-01-31', estado: 'Aprobado' },
        { id: 2, userRut: '98765432-1', totalAmount: 500000, startDate: '2022-02-01', endDate: '2022-02-28', estado: 'Pendiente' },
        { id: 3, userRut: '56789012-3', totalAmount: 2000000, startDate: '2022-03-01', endDate: '2022-03-31', estado: 'Rechazado' },
        { id: 4, userRut: '11111111-1', totalAmount: 1500000, startDate: '2022-04-01', endDate: '2022-04-30', estado: 'Aprobado' },
        { id: 5, userRut: '22222222-2', totalAmount: 800000, startDate: '2022-05-01', endDate: '2022-05-31', estado: 'Pendiente' },
        { id: 6, userRut: '33333333-3', totalAmount: 3000000, startDate: '2022-06-01', endDate: '2022-06-30', estado: 'Rechazado' },
        { id: 7, userRut: '44444444-4', totalAmount: 1200000, startDate: '2022-07-01', endDate: '2022-07-31', estado: 'Aprobado' },
        { id: 8, userRut: '55555555-5', totalAmount: 700000, startDate: '2022-08-01', endDate: '2022-08-31', estado: 'Pendiente' },
        { id: 9, userRut: '66666666-6', totalAmount: 2500000, startDate: '2022-09-01', endDate: '2022-09-30', estado: 'Rechazado' },
        { id: 10, userRut: '77777777-7', totalAmount: 900000, startDate: '2022-10-01', endDate: '2022-10-31', estado: 'Aprobado' },
    ];

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