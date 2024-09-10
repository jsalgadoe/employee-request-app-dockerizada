import { useContext, useEffect, useMemo, useState } from "react";
import { RequestLayout } from "../layout/RequestLayout";
import { AuthContext } from "../../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { InputIcon } from "../../ui/components/forms/InputIcon";
import PersonIcon from "@mui/icons-material/Person";
import { employeeRequestApi } from "../../utils/employeeRequestApi";
import Select from "react-select";

export const NewPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (!user.is_admin) {
      navigate("/requests/");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { code: "", resumen: "", description: "", employeeId: 0 },
  });

  const getEmployees = async () => {
    const { data } = await employeeRequestApi.get(
      "http://localhost:3000/api/v1/employee/listar-empleados"
    );

    if (data.ok) {
      setEmpleados(data.empleados);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const empleadosMapeado = useMemo(() => {
    return empleados.map((empleado) => ({
      value: empleado.id,
      label: empleado.full_name,
    }));
  }, [empleados]);

  if (!user.is_admin) return null;

  const styleTexfield = {
    "& .MuiInputBase-input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px white inset !important",
      WebkitTextFillColor: "black",
      caretColor: "black !important",
    },
  };

  const onSubmit = async (data) => {
    setSuccess(false);
    const { code, employeeId, description, resumen } = data;
    const { data: result } = await employeeRequestApi.post(
      "http://localhost:3000/api/v1/request/crear-solicitud",
      {
        code,
        employee_id: Number(employeeId.value),
        description: description,
        resumen,
      }
    );
    if (!result.ok) {
      setAlert(true);
      setError("No se pudo crear la solicitud");
    }
    setSuccess(true);
    setAlert(true);
    reset();
  };
  return (
    <RequestLayout titulo={"Registrar solicitudes"}>
      <Box sx={{ mt: 1 }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="animate__animated animate__fadeIn  animate__faster roboto-regular"
        >
          <Grid container>
            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <TextField
                label="codigo"
                type="text"
                placeholder="abc123"
                sx={styleTexfield}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputIcon icon={<PersonIcon />} color="primary.main" />
                  ),
                }}
                {...register("code", { required: true })}
                aria-invalid={errors.code ? "true" : "false"}
              />
              {errors.code?.type === "required" && (
                <p
                  role="alert"
                  className="text-red-500 font-semibold text-xs my-2"
                >
                  El codigo es requerido
                </p>
              )}
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Typography className="my-2"> Resumen</Typography>
              <TextareaAutosize
                maxRows={12}
                cols={44}
                className="border-gray-500 mt-2"
                aria-label="maximum height"
                placeholder="Maximo 12 filas"
                sx={styleTexfield}
                {...register("resumen", { required: true })}
                aria-invalid={errors.resumen ? "true" : "false"}
              />
              {errors.resumen?.type === "required" && (
                <p
                  role="alert"
                  className="text-red-500 font-semibold text-xs my-2"
                >
                  El resumen es requerido
                </p>
              )}
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Typography className="my-2"> Descripción</Typography>
              <TextareaAutosize
                maxRows={12}
                cols={44}
                className="border-gray-500 mt-2"
                aria-label="maximum height"
                placeholder="Maximo 12 filas"
                sx={styleTexfield}
                {...register("description", { required: true })}
                aria-invalid={errors.description ? "true" : "false"}
              />
              {errors.description?.type === "required" && (
                <p
                  role="alert"
                  className="text-red-500 font-semibold text-xs my-2"
                >
                  la Description es requerido
                </p>
              )}
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Controller
                name="employeeId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field} // Aquí pasamos las props del campo
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={empleadosMapeado[0]}
                    isSearchable={true}
                    options={empleadosMapeado}
                  />
                )}
              />
            </Grid>

            {!!error && (
              <Grid sx={{ mt: 2, width: "100%" }}>
                <p
                  role="alert"
                  style={{ display: alert ? "block" : "none" }}
                  className="text-red-500 font-semibold text-sm my-2 bg-red-100 p-5"
                >
                  {error}
                </p>
              </Grid>
            )}

            {!!success && (
              <Grid sx={{ mt: 2, width: "100%" }}>
                <p
                  onClick={() => {
                    setAlert(false);
                  }}
                  style={{ display: alert ? "block" : "none" }}
                  role="alert"
                  className="text-center text-green-700 font-semibold text-sm my-2 bg-green-200 p-5"
                >
                  {"La solicitud fue creada exitosamente"}
                </p>
              </Grid>
            )}

            {/* contenedor de botones */}
            <Grid container spacing={2} sx={{ mb: 2, mt: 1, width: "100%" }}>
              <Grid size={{ xs: 12, sm: 12 }}>
                <Button type="submit" variant="contained" fullWidth>
                  Crear Solicitud
                </Button>
              </Grid>
            </Grid>
            {/* contenedor de botones */}
          </Grid>
        </form>
      </Box>
    </RequestLayout>
  );
};
