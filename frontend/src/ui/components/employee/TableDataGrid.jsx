// import Box from "@mui/material/Box";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "identification", headerName: "Identification", width: 150 },
//   { field: "hire_date", headerName: "Hire Date", width: 150 },
//   { field: "full_name", headerName: "Full Name", width: 200 },
//   { field: "salary", headerName: "Salary", width: 100 },
// ];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

// export const TableDataGrid = () => {
//   return (
//     <Box sx={{ height: 400, width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 5,
//             },
//           },
//           filter: {
//             filterModel: {
//               items: [],
//             },
//           },
//         }}
//         pageSizeOptions={[5]}
//         disableColumnFilter
//         disableColumnSelector
//         disableDensitySelector
//         slots={{ toolbar: GridToolbar }}
//         slotProps={{
//           toolbar: {
//             showQuickFilter: true,
//             csvOptions: { disableToolbarButton: true },
//             printOptions: { disableToolbarButton: true },
//           },
//         }}
//         disableRowSelectionOnClick
//       />
//     </Box>
//   );
// };

import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import axios from "axios"; // o fetch para hacer la llamada a la API
import { useEffect, useState } from "react";
import { employeeRequestApi } from "../../../utils/employeeRequestApi.js";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "identification",
    headerName: "Identification",
    width: 150,
    editable: false,
  },
  {
    field: "hire_date",
    headerName: "Hire Date",
    width: 150,
    editable: false,
  },
  {
    field: "full_name",
    headerName: "Full Name",
    width: 160,
    editable: false,
  },
  {
    field: "salary",
    headerName: "Salary",
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
            page_number: page + 1,
            page_size: pageSize,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.pagination);
      const { results, total_results } = response.data.pagination;
      setRows(results);
      setRowCount(total_results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(`se esta disparando ${(page, pageSize[0])}`);
    fetchData();
  }, [page, pageSize]);

  return (
    <>
      <button
        onClick={(page) => {
          console.log(page);
          setPage(page + 1);
        }}
      >
        +1
      </button>
      <button>-1</button>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={rowCount}
          loading={loading}
          pagination
          paginationMode="server"
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) => {
            console.log(newPage[0]);
            setPage(newPage);
          }}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
            setPage(0);
          }}
          pageSizeOptions={[5, 10, 15, 100]}
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
    </>
  );
};
