import { Button, Link, TextField, Typography } from "@mui/material";
// import { Link as RouterLink, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { InputIcon } from "../../ui/components/forms/InputIcon";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
// import { AlertMuiComponent } from "../../ui";

import { employeeRequestApi } from "../../utils/employeeRequestApi";
import { AuthContext } from "../context/AuthContext";

const styleTexfield = {
  "& .MuiInputBase-input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 100px white inset !important",
    WebkitTextFillColor: "black",
    caretColor: "black !important",
  },
};

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login: StarLogin } = useContext(AuthContext);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { user: "", password: "" } });

  const onSubmit = async (data) => {
    try {
      const { data: result } = await employeeRequestApi.post(
        "http://localhost:3000/api/v1/auth/login",
        { name: data.user, password: data.password }
      );

      StarLogin(result.user, result.token);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.msg.startsWith("El usuario no este activo")) {
        setError(
          "Te has registrado, ahora comunicate con el admin para activar la cuenta"
        );
      } else {
        setError("Credenciales Incorrectas");
      }
    }
  };

  return (
    <AuthLayout titulo="Iniciar sesión">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="animate__animated animate__fadeIn  animate__faster roboto-regular"
      >
        <Grid container>
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="usuario"
              type="text"
              placeholder="correo@google.com"
              sx={styleTexfield}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputIcon icon={<Email />} color="primary.main" />
                ),
              }}
              {...register("user", { required: true })}
              aria-invalid={errors.user ? "true" : "false"}
            />
            {errors.user?.type === "required" && (
              <p
                role="alert"
                className="text-red-500 font-semibold text-xs my-2"
              >
                El usuario es requerido
              </p>
            )}
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              inputProps={{
                "data-testid": "password",
              }}
              placeholder="contraseña"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputIcon
                    icon={<Visibility />}
                    iconSecond={<VisibilityOff />}
                    changeIcon={setShowPassword}
                    valueChange={showPassword}
                    color="primary.main"
                  />
                ),
              }}
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <p
                role="alert"
                className="text-red-500 font-semibold text-xs my-2"
              >
                La contraseña es requerida
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
                Login
              </Button>
            </Grid>
            <Grid
              container
              display="flex"
              direction="row"
              justifyContent="end"
              alignItems="center"
            >
              <Typography variant="caption">No tienes usuario</Typography>
              <Link
                component={RouterLink}
                color="primary.main"
                to="/auth/register"
                sx={{ fontSize: 12, fontWeight: "bolder", mx: 1 }}
              >
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
          {/* contenedor de botones */}
        </Grid>
      </form>
    </AuthLayout>
  );
};

const Debugger = () => {
  const { status, user, token, login, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Context Data</h1>
      <p>Status: {status}</p>
      <p>User: {JSON.stringify(user)}</p>
      <p>Token: {token}</p>
      <button
        onClick={() => login({ id: "123", name: "John Doe" }, "sample-token")}
      >
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Debugger;
