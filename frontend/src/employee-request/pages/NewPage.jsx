import { useContext, useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { InputIcon } from "../../ui/components/forms/InputIcon";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

export const NewPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { code: "", resumen: "", description: "", employeeId: 0 },
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

  function onSubmit() {}
  return (
    <RequestLayout>
      <Box sx={{ mt: 10 }}>
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

            {/* contenedor de botones */}
            <Grid container spacing={2} sx={{ mb: 2, mt: 1, width: "100%" }}>
              <Grid size={{ xs: 12, sm: 12 }}>
                <Button type="input" variant="contained" fullWidth>
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
