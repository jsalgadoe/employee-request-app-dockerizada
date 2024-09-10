import { Button, TextField } from "@mui/material";
// import { Link as RouterLink, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";

import { AuthLayout } from "../layouts/AuthLayout";
import { InputIcon } from "../../ui/components/forms/InputIcon";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext, useState } from "react";

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

  const onLogin = async () => {
    const user = "jorge019";
    const password = "123456";

    const { data } = await employeeRequestApi.post(
      "http://localhost:3000/api/v1/auth/login",
      { name: user, password }
    );

    StarLogin(data.user, data.token);
  };

  return (
    <AuthLayout titulo="Iniciar sesión">
      <form
        onSubmit={() => {}}
        className="animate__animated animate__fadeIn  animate__faster roboto-regular"
      >
        <Grid container>
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              sx={styleTexfield}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputIcon icon={<Email />} color="primary.main" />
                ),
              }}
            />
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
            />
          </Grid>
          {/* 
          {!!error && (
            <Grid item sx={{ mt: 2, width: "100%" }}>
              <AlertMuiComponent
                message={error}
                severity="error"
                setError={setError}
              />
            </Grid>
          )} */}

          {/* contenedor de botones */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Button
                onClick={onLogin}
                type="button"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
          {/* contenedor de botones */}

          {/* <Grid
            container
            direction="row"
            justifyContent="end"
            alignItems="center"
          >
            <Typography variant="caption">
              ¿Nuevo en <b> VASH</b>?
            </Typography>
            <Link
              component={RouterLink}
              color="primary.main"
              to="/auth/signup"
              sx={{ fontSize: 12, fontWeight: "bolder", mx: 1 }}
            >
              Crear una cuenta
            </Link>
          </Grid> */}
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
