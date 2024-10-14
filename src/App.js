import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import Sales from "./pages/sales";
import Expenses from "./pages/expenses";
import Users from "./pages/users";
import Inventory from "./pages/inventory";
import Pie from "./pages/pie";
import Line from "./pages/line";
import LoginPage from "./components/auth/LoginPage";
import UserProfile from "./components/User/UserProfile";
import PrivateRoute from "./components/auth/PrivateRoute"; // Import PrivateRoute
import { adminOnly, isAuthenticated } from "./services/UserService";
// import PasswordResetForm from "./components/auth/PasswordResetPage";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* <Route path="/reset-password" element={<PasswordResetForm />} /> */}


          <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />

          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

          <Route path="/sales" element={<PrivateRoute><Sales /></PrivateRoute>} />

          <Route path="/expenses" element={<PrivateRoute><Expenses /></PrivateRoute>} />

          {adminOnly() && (
            <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          )}

          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />

          <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />

          <Route path="/pie" element={<PrivateRoute><Pie /></PrivateRoute>} />

          <Route path="/line" element={<PrivateRoute><Line /></PrivateRoute>} />
          
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
