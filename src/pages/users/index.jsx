import { Box, Button, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../components/Header";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useGridApiContext } from "@mui/x-data-grid";
import { GridFilterModel } from "@mui/x-data-grid";
import UserForm from "../../components/User/UserForm";
import { deleteUser, getAllUsers, getUser } from "../../services/UserService";
import UserDeleteDialog from "../../components/User/UserDeleteDialog";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ rows, setRows ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [ removeUser, setRemoveUser ] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditUser(null);
  };

  const handleOpenDialog = (id = null) => {
    setRemoveUser(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    getAllUsers().then((response) => {
      const data = response.data.map((item) => ({
        id: item.user.id,
        ...item,
        ...item.user
      }));
      setRows(data);
    }).catch((error) => {
      console.error("Error fetching data: ", error); 
    });
  }, []);

  const handleAddUser = (newUser) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows, newUser];
      return updatedRows;
    })
  };

  const handleEditUser = (row) => {
    getUser(row.id).then((response) => {
      setEditUser(response.data);
      setOpen(true);
    }).catch((error) => {
      console.error("Error fetching data by ID: ", error);
    })
  };

  const handleUserEdited = (updatedUser) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((user) =>
      user.id === updatedUser.id
      ? {...user, ...updatedUser}
      : user
    );
    return updatedRows;
    })
  }

  const handleDeleteUser = () => {
    deleteUser(removeUser).then(() => {
      setRows((prevRows) => prevRows.filter((row) => row.id !== removeUser));
      setRemoveUser(null);
      setOpenDialog(false);
    }).catch((error) => {
      console.error("Error deleting user: ", error);
    })
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "fullName", headerName: "Full Name", flex: 0.75 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "location", headerName: "Location", flex: 0.5 },
    { field: "username", headerName: "Username", flex: 0.5 },
    // { field: "password", headerName: "Password", flex: 0.75 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "logInTime", headerName: "Log-in Time", flex: 0.75 },
    { field: "logOutTime", headerName: "Log-out Time", flex: 0.75 },
    {
        field: "actions",
        headerName: "Actions",
        headerAlign: "center",
        flex: 1.25,
        renderCell: (params) => (
          <Box display="flex" justifyContent="space-evenly" margin="10px 0">
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.greenAccent[600],
                "&:hover": {
                  backgroundColor: "transparent",
                  borderColor: colors.greenAccent[400],
                  color: colors.greenAccent[300],
                },
              }}
              onClick={() => handleEditUser(params.row)}
            >
              <EditOutlinedIcon sx={{ mr: "10px" }} /> Edit
            </Button>
  
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.redAccent[600],
                "&:hover": {
                  backgroundColor: "transparent",
                  borderColor: colors.redAccent[400],
                  color: colors.redAccent[300],
                },
              }}
              onClick={() => handleOpenDialog(params.row.id)}
            >
              <DeleteOutlinedIcon sx={{ mr: "10px" }} /> Delete
            </Button>
          </Box>
        ),
      },
  ];

  return (
    <Box m="20px">
        <Box>
            <Button
                sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.gray[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    margin: "10px 0",
                    float: "right",
                    "&:hover": {
                    backgroundColor: colors.blueAccent[800],
                    },
                }}
                onClick={handleClickOpen}
            >
                <AddOutlinedIcon sx={{ mr: "10px" }} />
                Create User
            </Button>

            <UserForm
                open={open}
                handleClose={handleClose}
                onUserAdded={handleAddUser}
                editUser={editUser}
                onUserEdited={handleUserEdited}
            />
        </Box>

        <Header title="USERS" subtitle="View and manage users' information here"/>
        <Box
        m="40px 0 0 0"
        height="70vh"
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
            color: `${colors.greenAccent[100]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.gray[100]} !important`,
            margin: "0 20px 20px 0",
            fontSize: "14px"
          },
        }}
      >
        <DataGrid 
          rows={rows}
          columns={columns}
          autoHeight
          slots={{ toolbar: GridToolbar }}
        //   onFilterModelChange={handleFilterChange}
        />
      </Box>

      <UserDeleteDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteUser}
      />
    </Box>
  )
  
};

export default Users;
