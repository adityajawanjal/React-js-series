import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppProvider from "./services/AppProvider.jsx";
import { HelmetProvider } from "react-helmet-async";

const helmetContext = {};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </AppProvider>
  </React.StrictMode>
);
