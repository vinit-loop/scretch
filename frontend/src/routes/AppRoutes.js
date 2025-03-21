import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "../components/ProtectedRoute";
import ErrorFallback from "../components/ErrorFallback"; // Import Error Fallback UI
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateTask from "../pages/Task/CreateTask";
import EditTask from "../pages/Task/EditTask";
import List from "../pages/Task/TaskList";

const AppRoutes = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/addtask"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <CreateTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasklist"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <List />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:taskId"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
