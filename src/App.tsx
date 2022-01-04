import "bootstrap/dist/css/bootstrap.min.css";
import React, { FC, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ManageVacationsPage } from "./pages/ManageVacationsPage/ManageVacationsPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { NonAdminsVacationsPage } from "./pages/NonAdminsVacationsPage/NonAdminsVacationsPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { ReportsPage } from "./pages/ReportsPage/ReportsPage";
import { StateContext } from "./state-context";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

const App: FC = () => {
  const [appState, setAppState] = useState({
    vacations: [],
    isAdmin: 0,
    connectedUserId: 0,
    jwt: "",
    followedVacationIdsByConnectedUser: [],
  });

  const isAdmin = JSON.parse(localStorage.getItem("isAdmin") as string);

  return (
    <div className="app">
      <StateContext.Provider
        value={{ appState, setAppState: setAppState as any }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route
              path="vacations"
              element={!isAdmin ? <NonAdminsVacationsPage /> : <NotFoundPage />}
            />

            <Route
              path="reports"
              element={isAdmin ? <ReportsPage /> : <NotFoundPage />}
            />

            <Route
              path="manage-vacations"
              element={isAdmin ? <ManageVacationsPage /> : <NotFoundPage />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
};

export default App;
