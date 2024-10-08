import { Grid2 } from "@mui/material";
import { AuthContext } from "../../auth/context/AuthContext";
import { useContext } from "react";
import { NavBar } from "../../ui/components/shared/NavBar";
import { TableDataGrid } from "../../ui/components/requests/TableDataGrid";

export const IndexPage = () => {
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
            width: { sm: 850 },
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
          }}
        >
          <TableDataGrid is_admin={user.is_admin} />
        </Grid2>
      </Grid2>
    </div>
  );
};
