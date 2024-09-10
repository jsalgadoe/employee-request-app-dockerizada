import PropTypes from "prop-types";
import { NavBar } from "../../ui/components/shared/NavBar";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { Box } from "@mui/material";
export const EmployeeLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <NavBar is_admin={user.is_admin} logout={logout} />
      <Box sx={{ mt: 10 }}>{children}</Box>
    </div>
  );
};

EmployeeLayout.propTypes = {
  children: PropTypes.node,
};
