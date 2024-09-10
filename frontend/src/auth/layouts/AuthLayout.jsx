import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

export const AuthLayout = ({ children, titulo }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
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
      </Grid>
    </Grid>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
  titulo: PropTypes.string,
};
