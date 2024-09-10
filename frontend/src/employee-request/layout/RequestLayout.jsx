import PropTypes from "prop-types";
import { NavBar } from "../../ui/components/shared/NavBar";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";

export const RequestLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <NavBar is_admin={user.is_admin} logout={logout} />
      {children}
    </div>
  );
};

RequestLayout.propTypes = {
  children: PropTypes.node,
};
