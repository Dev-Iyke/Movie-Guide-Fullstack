import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import AuthProvider from "./context/authContext.jsx";
import UserMoviesProvider from "./context/UserMoviesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <UserMoviesProvider>
          <AppLayout>
            <App />
          </AppLayout>
        </UserMoviesProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
