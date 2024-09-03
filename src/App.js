import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import Sales from "./pages/sales";
import Expenses from "./pages/expenses";
import Users from "./pages/users";
import Profile from "./pages/profile";
import Customers from "./pages/customers";
// import Inventory from "./pages/inventory";
import Analytics from "./pages/analytics";
import Pie from "./pages/pie";
import Line from "./pages/line";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Box
            width={ isSidebarCollapsed ? "80px" : "280px" }
            transition="width 0.3s ease-in-out"
          >
            <Sidebar
              isCollapsed={isSidebarCollapsed}
              onCollapseToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
          </Box>
          
          <Box
            flexGrow={1}
            overflow="hidden"
            transition= "width 0.3s ease-in-out"
            sx={{
              scale: "0.99"
            }}
          >
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/users" element={<Users />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/customers" element={<Customers />} />
                {/* <Route path="/inventory" element={<Inventory />} /> */}
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
              </Routes>
            </main>
          </Box> 
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
