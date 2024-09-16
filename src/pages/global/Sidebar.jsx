import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
// import { Home } from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem 
            active={selected === title}
            style={{color: colors.gray[100]}}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    )
}


const Sidebar = ({ isCollapsed, onCollapseToggle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    const [selected, setSelected] = useState("");

    useEffect(() => {
        switch(location.pathname) {
            case "/":
                setSelected("Dashboard");
                break;
            case "/sales":
                setSelected("Sales");
                break;
            case "/expenses":
                setSelected("Expenses");
                break;
            case "/users":
                setSelected("Users");
                break;
            case "/profile":
                setSelected("Profile");
                break;
            case "/customers":
                setSelected("Customers");
                break;
            case "/inventory":
                setSelected("Inventory");
                break;
            case "/analytics":
                setSelected("Analytics");
                break;
            case "/pie":
                setSelected("Pie Chart");
                break;
            case "/line":
                setSelected("Line Chart");
                break;
            default:
                setSelected("");
                break;
        }
    }, [location.pathname]);
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                    transition: "all 0.3s ease-in-out"
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },

                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar 
            collapsed={isCollapsed}
            style={{
                position: "fixed",
                height: "100vh",
                transition: "all 0.3s ease-in-out",
            }}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={onCollapseToggle}
                        icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.gray[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.gray[100]}>Menu</Typography>
                                <IconButton onClick={onCollapseToggle}>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* USER */}
                    {!isCollapsed && (
                        <Box mb="25px">
                           <Box display="flex" justifyContent="center" alignItems="center">
                                <img 
                                    src={`../../assets/user.png`}
                                    alt="user-profile"
                                    width="100px"
                                    height="100px"
                                    style={{cursor: "pointer", borderRadius: "50%"}} />
                            </Box> 

                            <Box textAlign="center">
                                <Typography 
                                    variant="h2" 
                                    color={colors.gray[100]}
                                    fontWeight="bold"
                                    mt="15px"
                                    >User</Typography>
                                <Typography
                                    variant="h5"
                                    color={colors.greenAccent[500]}
                                    >Employee</Typography>
                            </Box>
                        </Box>
                    )}

                    {/* MENU ITEMS */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon/>}
                            selected = {selected}
                            setSelected = {setSelected}
                        />

                        {!isCollapsed && (
                            <Typography
                            variant="h6"
                            color={colors.gray[300]}
                            m="15px 0 5px 20px"
                            >Transactions</Typography>
                        )}
                        

                        <Item
                            title="Sales"
                            to="/sales"
                            icon={<ReceiptOutlinedIcon/>}
                            selected = {selected}
                            setSelected = {setSelected}
                        />

                        <Item
                            title="Expenses"
                            to="/expenses"
                            icon={<MonetizationOnOutlinedIcon/>}
                            selected = {selected}
                            setSelected = {setSelected}
                        />

                        {!isCollapsed && (
                            <Typography
                            variant="h6"
                            color={colors.gray[300]}
                            m="15px 0 5px 20px"
                            >Manage</Typography>
                        )}

                        <Item
                            title="Users"
                            to="/users"
                            icon={<PeopleOutlinedIcon/>}
                            selected = {selected}
                            setSelected = {setSelected}
                        />
  

                        <Item
                            title="Profile"
                            to="/profile"
                            icon={<PersonOutlinedIcon/>}
                            selected = {selected}
                            setSelected = {setSelected}
                        />

                        <Item
                            title="Customers"
                            to="/customers"
                            icon={<ContactsOutlinedIcon/>}
                            selected = {selected}
                            setSelected = {setSelected}
                        />
                        
                        <Item
                            title="Inventory"
                            to="/inventory"
                            icon={<Inventory2OutlinedIcon/>}
                            selected = {selected}
                            setSelected = {setSelected}
                        />

                        {!isCollapsed && (
                           <Typography
                            variant="h6"
                            color={colors.gray[300]}
                            m="15px 0 5px 20px"
                            >Reports</Typography> 
                        )}    

                        <Item
                            title="Analytics"
                            to="/analytics"
                            icon={<BarChartOutlinedIcon/>}
                            selected = {selected}
                            setSelected = {setSelected}
                        />

                        <Item
                            title="Pie Chart"
                            to="/pie"
                            icon={<PieChartOutlineOutlinedIcon/>}
                            selected = {selected}
                            setSelected = {setSelected}
                        />

                        <Item
                            title="Line Chart"
                            to="/line"
                            icon={<TimelineOutlinedIcon/>}
                            selected = {selected}
                            setSelected = {setSelected}
                        />

                        {/* <Item
                            title="Map"
                            to="/map"
                            icon={<MapOutlinedIcon/>}
                            selected = {selected}
                            setSelected = {setSelected}
                        /> */}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;