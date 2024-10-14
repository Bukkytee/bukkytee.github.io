import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import  SearchIcon  from "@mui/icons-material/Search";
import { getYourProfile, isAdmin, isAuthenticated, logout } from "../../services/UserService";
import { Menu, MenuItem, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const navigate = useNavigate();
    
    const [user, setUser] = useState({ fullName: "", role: "" });

    const authenticated = isAuthenticated();
    const admin = isAdmin();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getYourProfile();
                if (response && response.data) {
                    setUser({
                        fullName: response.data.fullName,
                        role: response.data.role
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        };

        if (authenticated) {
            fetchProfile();
        }
    }, [authenticated]);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        const confirmDelete = window.confirm("Are you sure you want to logout ?");

        if (confirmDelete) {
            logout();
            handleProfileMenuClose();
            navigate("/login");

        }
    }
    
    return (
        <Box display= "flex" justifyContent= "space-between" p={2}>

        {/* SEARCH BAR */}

            <Box 
            display="flex" 
            backgroundColor={colors.primary[400]} borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search"/>
                <IconButton type="button" sx={{p: 1}}>
                    <SearchIcon/>
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon/>
                    ) : (
                        <LightModeOutlinedIcon/>
                    )}
                </IconButton>

                <IconButton>
                    <NotificationsOutlinedIcon/>
                </IconButton>

                <IconButton>
                    <SettingsOutlinedIcon/>
                </IconButton>
                {authenticated && (
                    <IconButton onClick={handleProfileMenuOpen}>
                        <PersonOutlinedIcon/>
                    </IconButton>
                )}
                
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
            >
                <MenuItem>
                    <Avatar>{user.fullName.charAt(0)}</Avatar>
                    <Box sx={{ ml: 2}}>
                        <Typography variant="body1">{user.fullName}</Typography>
                        <Typography variant="body2" marginTop= "5px" color={colors.greenAccent[600]}>{user.role}</Typography>
                    </Box>
                    
                </MenuItem>
                {authenticated && <MenuItem onClick={handleLogout}>User Profile</MenuItem>}
                {authenticated && <MenuItem onClick={handleLogout}>Log out</MenuItem>}
            </Menu>
        </Box>
        );
};

export default Topbar;