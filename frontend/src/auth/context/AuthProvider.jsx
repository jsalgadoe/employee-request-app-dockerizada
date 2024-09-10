import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import PropTypes from "prop-types";
import { employeeRequestApi } from "../../utils/employeeRequestApi";

const initialState = {
  status: "checking",
  user: null,
  token: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await employeeRequestApi.get(
        "http://localhost:3000/api/v1/auth/renew"
      );

      if (data.ok) {
        localStorage.setItem("token", data.token);
        dispatch({
          type: "LOGIN",
          payload: {
            user: data.user,
            token: data.token,
          },
        });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    } else {
      dispatch({ type: "LOGOUT" });
    }
  };

  useEffect(() => {
    checkAuthToken();
  }, []);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    dispatch({
      type: "LOGIN",
      payload: { user, token },
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        checkAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
