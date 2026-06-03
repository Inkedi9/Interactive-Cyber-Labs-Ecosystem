import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CyberModeProvider } from "./context/CyberModeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CyberModeProvider>
        <App />
      </CyberModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);