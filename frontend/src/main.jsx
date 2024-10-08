import React from "react";
import ReactDOM from "react-dom/client";
import { RequestEmployeeApp } from "./RequestEmployeeApp.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RequestEmployeeApp />
    </BrowserRouter>
  </React.StrictMode>
);
