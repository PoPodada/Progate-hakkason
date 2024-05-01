import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.tsx";
import Team from "./pages/Team.tsx";
import "./firebase.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./utils/AuthContext.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/team", element: <Team /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
