import { Route, Routes, Navigate } from "react-router-dom";
import { IndexPage, NewPage } from "../pages";

export const RequestRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/new" element={<NewPage />} />

      <Route path="/*" element={<Navigate to="/requests/" />} />
    </Routes>
  );
};
