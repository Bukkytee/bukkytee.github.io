import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../services/UserService";
import Sidebar from "../../pages/global/Sidebar";
import Topbar from "../../pages/global/Topbar";

const PrivateRoute = ({ children, isSidebarCollapsed, onCollapseToggle }) => {
  const authenticated = isAuthenticated();

  return authenticated ? (
    <Box className="app">
      <Box
        width={isSidebarCollapsed ? "80px" : "280px"}
        transition="width 0.3s ease-in-out"
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onCollapseToggle={onCollapseToggle}
        />
      </Box>
      <Box
        flexGrow={1}
        overflow="hidden"
        transition="width 0.3s ease-in-out"
        sx={{ scale: "0.99" }}
      >
        <Topbar />
        {children}
      </Box>
    </Box>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
