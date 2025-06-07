import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // si usas Tailwind o CSS propio

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
