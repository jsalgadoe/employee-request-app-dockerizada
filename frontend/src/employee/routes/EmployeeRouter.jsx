import { Route, Routes, Navigate } from "react-router-dom";
import { IndexPage, NewPage } from "../pages";

export const EmployeeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/new" element={<NewPage />} />

      <Route path="/*" element={<Navigate to="/employees/" />} />
    </Routes>
  );
};
