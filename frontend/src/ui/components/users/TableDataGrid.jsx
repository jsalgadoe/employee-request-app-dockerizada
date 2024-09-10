import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { employeeRequestApi } from "../../../utils/employeeRequestApi.js";
import { Checkbox, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const TableDataGrid = (props) => {
  const { is_admin } = props;
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const token = localStorage.getItem("token");

  const handleCheckboxChange = (id) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, status: !row.status } : row
    );
    setRows(updatedRows);
  };

  const handleCheckboxChangeAdmin = (id) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, is_admin: !row.is_admin } : row
    );
    setRows(updatedRows);
  };

  const showSwal = (id) => {
    withReactContent(Swal)
      .fire({
        title: "¿Esta seguro que deseas actualizar los permisos del usuario?",
        cancelButtonColor: "red",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        denyButtonText: `Cancelar`,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const row = rows.find((row) => row.id === id);
          const response = await updateUser({
            id: row.id,
            status: row.status,
            is_admin: row.is_admin,
          });

          if (response.data.ok) {
            Swal.fire(
              "Los permisos del usuario ha sido actualizado con exito",
              "",
              "success"
            );
          }
        }
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "name",
      width: 150,
      editable: false,
    },
    {
      field: "status",
      headerName: "status",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.status}
          onChange={() => handleCheckboxChange(params.row.id)}
          color="primary"
        />
      ),
    },
    {
      field: "is_admin",
      headerName: "is_admin",
      width: 160,
      editable: false,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.is_admin}
          onChange={() => handleCheckboxChangeAdmin(params.row.id)}
          color="primary"
        />
      ),
    },
    {
      field: "Actions",
      headerName: "Acción",
      width: 160,
      editable: false,
      renderCell: (params) => (
        <>
          {is_admin && (
            <IconButton
              aria-label="save"
              onClick={() => showSwal(params.row.id)}
            >
              <SaveIcon color="success" />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  const usersData = async () => {
    setLoading(true);
    try {
      const response = await employeeRequestApi.get(
        `${import.meta.env.VITE_API_URL}/auth/listar-usuarios`,
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

      setRows(results);
      setRowCount(total_results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async ({ id, status, is_admin }) => {
    console.log({ id, status, is_admin });
    setLoading(true);
    try {
      const response = await employeeRequestApi.put(
        `${import.meta.env.VITE_API_URL}/auth/edit/${id}`,
        {
          status: status,
          is_admin: is_admin,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchData();
    usersData();
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

TableDataGrid.propTypes = {
  is_admin: PropTypes.bool.isRequired,
};
