import { DataGrid} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Box } from "@mui/material";
import { GridApiCommunity } from "@mui/x-data-grid/internals";



type Props = {
  columns: any;
  rows: any;
  id?: string;
  apiRef?: React.MutableRefObject<GridApiCommunity>;
  checkBox?: boolean;
};

const DataTable = (props: Props) => {

  return (
    <Box className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={props.columns}
        localeText={{
          noRowsLabel: "No se ha encontrado datos.",
          noResultsOverlayLabel: "No se ha encontrado ningún resultado",
          toolbarColumns: "Columnas",
          toolbarColumnsLabel: "Seleccionar columnas",
          toolbarFilters: "Filtros",
          toolbarFiltersLabel: "Ver filtros",
          toolbarFiltersTooltipHide: "Quitar filtros",
          toolbarFiltersTooltipShow: "Ver filtros",
          footerRowSelected: (count) => `${count.toLocaleString()} fila(s) seleccionada(s)`,
        }}
        checkboxSelection={props.checkBox}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "rgb(30,30,30)",
            width: "100%",
            color: "white",
            padding: "0 15px",
            fontSize: "16px",
          },

          "& .MuiDataGrid-cell": {
            fontWeight: 400,
            fontSize: "16px",
          },
        }}
        getRowId={(row) => row[props.id ? props.id : "id"]}
        apiRef={props.apiRef}
      />
    </Box>
  );
};

export default DataTable;
