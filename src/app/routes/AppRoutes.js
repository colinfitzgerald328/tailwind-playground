import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AthletePage from "../pages/AthletePage";
import AthletesListPage from "../pages/AthletesListPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/athletes/:id" element={<AthletePage />} />
    <Route path="/athletes" element={<AthletesListPage />} />
  </Routes>
);

export default AppRoutes;
