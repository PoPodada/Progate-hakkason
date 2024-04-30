import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.tsx";
import Team from "./pages/Team.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { firebaseApp } from "./firebase.ts";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/team", element: <Team /> },
]);

firebaseApp;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
