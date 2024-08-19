import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {mockDataInvoices} from "../../data/mockData";

import Header from "../../components/Header";


const Expenses = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        {
            field: "id",
            headerName: "ID",

        },

        {
            field: "name", 
            headerName: "Name", 
            flex: 1, 
            cellClassName: "name-column--cell"
        },

        {
            field: "email", 
            headerName: "Email", 
            flex: 1,
        },

        {
            field: "phone", 
            headerName: "Phone Number", 
            flex: 1,
        },

        {
            field: "cost", 
            headerName: "Cost", 
            flex: 1,
            renderCell: (params) => (
                <Typography color={colors.greenAccent[500]} m="15px 0">
                    ₦{params.row.cost}
                </Typography>
            )
        },

        {
            field: "date", 
            headerName: "Date", 
            flex: 1,
        },

    ]

    return (
        <Box m="20px">
            <Header title="EXPENSES" subtitle="Expenses transactions listed here"/>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },

                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },

                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },

                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },

                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },

                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },

                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[100]} !important`
                    },
                }}
            >
                <DataGrid
                    rows={mockDataInvoices}
                    columns={columns}
                    checkboxSelection
                />
            </Box>        
        </Box>
    ); 
};

export default Expenses;