import PropTypes from "prop-types";
import { NavBar } from "../../ui/components/shared/NavBar";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { Grid2, Typography } from "@mui/material";

export const RequestLayout = ({ children, titulo }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <NavBar is_admin={user.is_admin} logout={logout} />

      <Grid2
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#dcdcdcd6",
          padding: 4,
        }}
      >
        <Grid2
          className="box-shadow"
          justifyContent="end"
          size={{ xs: 3 }}
          sx={{
            display: "flex",
            width: "100%",
            marginBottom: 2,
            borderRadius: 2,
          }}
        ></Grid2>

        <Grid2
          size={{ xs: 3 }}
          className="box-shadow"
          sx={{
            width: { sm: 450 },
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, color: "text.secondary" }}>
            {" "}
            {titulo}{" "}
          </Typography>

          {children}
        </Grid2>
      </Grid2>
    </div>
  );
};

RequestLayout.propTypes = {
  children: PropTypes.node,
  titulo: PropTypes.string,
};
