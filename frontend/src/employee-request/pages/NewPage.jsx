import { useContext, useEffect } from "react";
import { RequestLayout } from "../layout/RequestLayout";
import { AuthContext } from "../../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const NewPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.is_admin) {
      navigate("/requests/");
    }
  }, [user, navigate]);

  if (!user.is_admin) return null;
  return <RequestLayout>IndexPage Request </RequestLayout>;
};
