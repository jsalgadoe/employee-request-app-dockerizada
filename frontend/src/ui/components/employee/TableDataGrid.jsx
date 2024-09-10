import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { employeeRequestApi } from "../../../utils/employeeRequestApi.js";
import { format } from "date-fns";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "identification",
    headerName: "identificación",
    width: 150,
    editable: false,
  },
  {
    field: "hire_date",
    headerName: "Fecha de ingreso",
    width: 150,
    editable: false,
  },
  {
    field: "full_name",
    headerName: "Nombre Completo",
    width: 160,
    editable: false,
  },
  {
    field: "salary",
    headerName: "Salario",
    width: 130,
    editable: false,
  },
];

export const TableDataGrid = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await employeeRequestApi.get(
        `${import.meta.env.VITE_API_URL}/employee/empleados`,
        {
          params: {
            page_number: page + 1, // Corrección aquí
            page_size: pageSize,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { results, total_results } = response.data.pagination;

      const resultsMap = results.map((employee) => {
        employee["hire_date"] = format(
          new Date(employee["hire_date"]),
          "dd/MM/yyyy"
        );
        employee["salary"] = new Intl.NumberFormat("es-CO").format(
          employee["salary"]
        );
        return employee;
      });

      setRows(resultsMap);
      setRowCount(total_results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        pagination
        paginationMode="server"
        page={page}
        pageSize={pageSize}
        onPaginationModelChange={(params) => {
          setPage(params.page);
          setPageSize(params.pageSize);
        }}
        autoPageSize
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
