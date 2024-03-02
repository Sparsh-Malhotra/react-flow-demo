import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NodeContextProvider } from "./Context";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NodeContextProvider>
      <App />
    </NodeContextProvider>
    <ToastContainer />
  </React.StrictMode>
);
