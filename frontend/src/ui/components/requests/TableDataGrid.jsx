import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { employeeRequestApi } from "../../../utils/employeeRequestApi.js";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import PropTypes from "prop-types";

export const TableDataGrid = (props) => {
  const { is_admin } = props;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const token = localStorage.getItem("token");

  const showSwal = (id) => {
    withReactContent(Swal)
      .fire({
        title: "¿Esta seguro que deseas eliminar la solicitud?",
        cancelButtonColor: "red",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        denyButtonText: `Cancelar`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(id);
          const result = deleteRequest(id);
          if (result) {
            const newRecords = rows.filter((item) => item.id !== id);
            setRows(newRecords);
          }

          Swal.fire("El requesito ha sido eliminado con exito", "", "success");
        }
      });
  };

  const showSwalShow = (id) => {
    const record = rows.find((item) => item.id == id);
    withReactContent(Swal).fire({
      title: `Solicitud #${record.id}`,
      html: `<div class="flex flex-col justify-start items-start">
         <p><b>Codigo</b>:</p>
      <p>${record.code}</p>
       <br/>
      <p><b>Resumen</b>:</p>
      <p>${record.resumen}</p>
      <br/>
      <br/>
      <p><b>Descripción</b>:</p>
      <p>${record.description}</p>
      <br/>
      <br/>
         <p><b>Empleado</b>:</p>
      <p>${record.employee}</p>
      <br/>
      <br/>
      </div>`,
      showClass: {
        popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
      },
      hideClass: {
        popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
      },
      confirmButtonColor: "green",
      confirmButtonText: "Aceptar",
      denyButtonText: `Cancelar`,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "code",
      headerName: "Codigo",
      width: 150,
      editable: false,
    },
    {
      field: "resumen",
      headerName: "Resumen",
      width: 150,
      editable: false,
    },
    {
      field: "description",
      headerName: "Descripción",
      width: 160,
      editable: false,
    },
    {
      field: "employee",
      headerName: "Empleado",
      width: 130,
      editable: false,
    },
    {
      field: "actions",
      headerName: "",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="show"
            onClick={() => showSwalShow(params.row.id)}
          >
            <VisibilityIcon color="success" />
          </IconButton>

          {is_admin && (
            <IconButton
              aria-label="delete"
              onClick={() => showSwal(params.row.id)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await employeeRequestApi.get(
        `${import.meta.env.VITE_API_URL}/request/solicitudes`,
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

      const resultsMap = results.map((request) => {
        request["employee"] = request.employee.full_name;
        return request;
      });

      setRows(resultsMap);
      setRowCount(total_results);
    } catch (error) {
      console.warning("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id) => {
    try {
      const response = await employeeRequestApi.delete(
        `${import.meta.env.VITE_API_URL}/request/eliminar-solicitud/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.ok;
    } catch (error) {
      console.error("Error Al eliminar", error);
    }
  };

  useEffect(() => {
    console.log(`Page: ${page}, PageSize: ${pageSize}`);
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

TableDataGrid.propTypes = {
  is_admin: PropTypes.bool.isRequired,
};
