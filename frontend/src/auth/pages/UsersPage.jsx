import Grid from "@mui/material/Grid2";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../ui/components/shared/NavBar";
import { TableDataGrid } from "../../ui/components/users/TableDataGrid";
// import PropTypes from "prop-types";

export const UsersPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!user.is_admin) {
      navigate("/employees/");
    }
  }, [user, navigate]);

  if (!user.is_admin) return null;
  return (
    <>
      <NavBar is_admin={user.is_admin} logout={logout} />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", backgroundColor: "dcdcdcd6", padding: 4 }}
      >
        <Grid
          className="box-shadow"
          justifyContent="end"
          size={{ xs: 3 }}
          sx={{
            display: "flex",
            width: "100%",
            marginBottom: 2,
            borderRadius: 2,
          }}
        ></Grid>

        <Grid
          size={{ xs: 3 }}
          className="box-shadow"
          sx={{
            width: { sm: 850 },
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
          }}
        >
          <TableDataGrid is_admin={user.is_admin} />
        </Grid>
      </Grid>
    </>
  );
};
