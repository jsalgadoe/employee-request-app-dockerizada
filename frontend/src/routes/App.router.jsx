import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

//* context Api
import { AuthContext } from "../auth/context/AuthContext";

//* Routes
import { AuthRouter } from "../auth/routes/AuthRouter";
import { EmployeeRouter } from "../employee/routes/EmployeeRouter";
import { RequestRouter } from "../employee-request/routes/RequestRouter";

export const AppRouter = () => {
  const { status } = useContext(AuthContext);

  if (status === "checking") {
    return <h1>Checking authentication...</h1>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<AuthRouter />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/employees/*" element={<EmployeeRouter />} />
          <Route path="/requests/*" element={<RequestRouter />} />

          <Route path="*" element={<Navigate to="/employees/*" />} />
        </>
      )}
    </Routes>
  );
};
