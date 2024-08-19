import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
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

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className = "app">
                    <Sidebar />
                    <main style={{marginLeft: "280px"}} className="content">
                        <Topbar/>
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
                </div>
            </ThemeProvider>
            
        </ColorModeContext.Provider>
        
    );
}

export default App;