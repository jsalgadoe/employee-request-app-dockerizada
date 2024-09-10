import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { InputIcon } from "../../ui/components/forms/InputIcon";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { EmployeeLayout } from "../layout/EmployeeLayout";
import { employeeRequestApi } from "../../utils/employeeRequestApi";

export const NewPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      hire_date: "",
      salary: "",
      identification: "",
    },
  });

  useEffect(() => {
    if (!user.is_admin) {
      navigate("/requests/");
    }
  }, [user, navigate]);

  if (!user.is_admin) return null;

  const styleTexfield = {
    "& .MuiInputBase-input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px white inset !important",
      WebkitTextFillColor: "black",
      caretColor: "black !important",
    },
  };

  const onSubmit = async (data) => {
    try {
      setSuccess(false);
      console.log(
        data.full_name,
        data.hire_date,
        data.salary,
        data.identification
      );
      const { data: result } = await employeeRequestApi.post(
        "http://localhost:3000/api/v1/employee/nuevo-empleado",
        {
          full_name: data.full_name,
          hire_date: data.hire_date,
          salary: Number(data.salary),
          identification: Number(data.identification),
        }
      );
      if (result.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error.response.data);
      if (!error.response.data.ok) {
        setError("Credenciales Incorrectas");
      }
    }
  };

  return (
    <EmployeeLayout titulo={"Registro de empleado"}>
      <Box sx={{ mt: 2 }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="animate__animated animate__fadeIn  animate__faster roboto-regular"
        >
          <Grid container>
            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <TextField
                label="Nombre"
                type="text"
                placeholder="correo@google.com"
                sx={styleTexfield}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputIcon icon={<PersonIcon />} color="primary.main" />
                  ),
                }}
                {...register("full_name", { required: true, minLength: 6 })}
                aria-invalid={errors.full_name ? "true" : "false"}
              />
              {errors.full_name?.type === "required" && (
                <p
                  role="alert"
                  className="text-red-500 font-semibold text-xs my-2"
                >
                  El nombre es requerido
                </p>
              )}
              {errors.full_name?.type === "minLength" && (
                <p
                  role="alert"
                  className="text-red-500 font-semibold text-xs my-2"
                >
                  El nombre debe tener al menos 6 caracteres
                </p>
              )}
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <TextField
                label="identification"
                type={"number"}
                placeholder="145789521"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputIcon
                      icon={<FingerprintIcon />}
                      color="primary.main"
                    />
                  ),
                }}
                {...register("identification", {
                  required: true,
                  minLength: 6,
                })}
                aria-invalid={errors.identification ? "true" : "false"}
              />
              {errors.identification?.type === "required" && (
                <p
                  role="alert"
                  className="text-red-500 font-semibold text-xs my-2"
                >
                  La identificacion es requerida
                </p>
              )}

              {errors.identification?.type === "minLength" && (
                <p
                  role="alert"
                  className="text-red-500 font-semibold text-xs my-2"
                >
                  El identificacion debe tener al menos 6 digitos
                </p>
              )}
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <TextField
                label="Fecha de ingreso"
                type={"date"}
                placeholder="2024-05-19"
                fullWidth
                InputProps={{}}
                {...register("hire_date", { required: true })}
                aria-invalid={errors.hire_date ? "true" : "false"}
              />
              {errors.hire_date?.type === "required" && (
                <p
                  role="alert"
                  className="text-red-500 font-semibold text-xs my-2"
                >
                  La Fecha de ingreso es requerida
                </p>
              )}
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <TextField
                label="salario"
                type={"number"}
                placeholder="1500"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputIcon
                      icon={<MonetizationOnIcon />}
                      color="primary.main"
                    />
                  ),
                }}
                {...register("salary", { required: true })}
                aria-invalid={errors.salary ? "true" : "false"}
              />
              {errors.salary?.type === "required" && (
                <p
                  role="alert"
                  className="text-red-500 font-semibold text-xs my-2"
                >
                  El salario es requerido
                </p>
              )}
            </Grid>

            {!!error && (
              <Grid sx={{ mt: 2, width: "100%" }}>
                <p
                  role="alert"
                  className="text-red-500 font-semibold text-sm my-2 bg-red-100 p-5"
                >
                  {error}
                </p>
              </Grid>
            )}

            {!!success && (
              <Grid sx={{ mt: 2, width: "100%" }}>
                <p
                  role="alert"
                  className="text-green-700 font-semibold text-sm my-2 bg-green-200-100 p-5"
                >
                  Creado con exito.
                </p>
              </Grid>
            )}

            {/* contenedor de botones */}
            <Grid container spacing={2} sx={{ mb: 2, mt: 10, width: "100%" }}>
              <Grid size={{ xs: 12, sm: 12 }}>
                <Button type="input" variant="contained" fullWidth>
                  Crear empleado
                </Button>
              </Grid>
            </Grid>
            {/* contenedor de botones */}
          </Grid>
        </form>
      </Box>
    </EmployeeLayout>
  );
};
