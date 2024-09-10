import { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { EmployeeLayout } from "../layout/EmployeeLayout";
import { useNavigate } from "react-router-dom";

export const NewPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.is_admin) {
      navigate("/employees/");
    }
  }, [user, navigate]);

  if (!user.is_admin) return null;
  return (
    <EmployeeLayout>
      <p>resgitrar un empleado</p>
    </EmployeeLayout>
  );
};
