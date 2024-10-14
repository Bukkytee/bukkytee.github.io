import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  listBlock1Entries,
  getBlock1Entry,
  deleteBlock1Entry,
  deleteAllBlock1Entries,
  updateBlock1Entry
} from "../../services/Block1Service";
import Block1Form from "./Block1Form";
import Block1DeleteDialog from "./Block1DeleteDialog";
import { isAdmin } from "../../services/UserService";

const Block1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editBlock1Entry, setEditBlock1Entry] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteBlock1, setDeleteBlock1] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const admin = isAdmin();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditBlock1Entry(null);
  };

  const handleOpenDialog = (id = null) => {
    setDeleteBlock1(id);
    setIsBulkDelete(id === null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    listBlock1Entries()
      .then((response) => {
        const data = response.data.map((item) => ({
          id: item.id,
          ...item,
        }));
        setRows(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleAddBlock1Entry = (newBlock1Entry) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows, newBlock1Entry];
      return updatedRows;
    });
  };

  const handleEditBlock1Entry = (row) => {
    getBlock1Entry(row.id)
      .then((response) => {
        setEditBlock1Entry(response.data);
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching block by ID: ", error);
      });
  };

  const handleBlock1EntryEdited = (updatedBlock1Entry) => {
    updateBlock1Entry(updatedBlock1Entry.id, updatedBlock1Entry).then(() => {
      listBlock1Entries().then((response) => {
        const updatedRows = response.data.map((item) => ({
          id: item.id,
          ...item,
        }));
        setRows(updatedRows);
      })
      .catch((error) => {
        console.error("Error fetching updated data: ", error); 
       });
    })
   .catch((error) => {
    console.error("Error updating block entry: ", error); 
   })
  };

  const handleDeleteBlock1Entry = () => {
    if (isBulkDelete) {
      deleteAllBlock1Entries()
        .then(() => {
          setRows([]);
          setOpenDialog(false);
        })
        .catch((error) => {
          console.error("Error deleting all block1 entries: ", error);
        });
    } else if (deleteBlock1) {
      deleteBlock1Entry(deleteBlock1)
      .then(() => {
        listBlock1Entries().then((response) => {
          const data = response.data.map((item) => ({
            id: item.id,
            ...item,
          }));
          setRows(data);
        })
        .catch((error) => {
          console.error("Error fetching updated block1 entries: ", error); 
        });

        setDeleteBlock1(null);
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Error deleting block1 entry: ", error);
      });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "date", headerName: "Date", flex: 0.5 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "inQuantity", headerName: "In", flex: 0.5 },
    { field: "outQuantity", headerName: "Out", flex: 0.5 },
    {
      field: "currentStock",
      headerName: "Balance (Current Stock)",
      flex: 0.5,
    },
    ...(admin ? [
        {
          field: "actions",
          headerName: "Actions",
          headerAlign: "center",
          flex: 1,
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
                onClick={() => handleEditBlock1Entry(params.row)}
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
    ] : [])

  ];

  return (
    <Box m="20px 10px" display="flex" flexDirection="column">
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
          Add Entry
        </Button>

        {admin && (
                  <Button
                  sx={{
                    backgroundColor: colors.redAccent[600],
                    color: colors.gray[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    margin: "10px 20px",
                    float: "right",
                    "&:hover": {
                      backgroundColor: colors.redAccent[700],
                    },
                  }}
                  onClick={() => handleOpenDialog(null)}
                >
                  <DeleteOutlinedIcon sx={{ mr: "10px" }} />
                  Delete All Entries
                </Button>
          )}

        <Block1Form
          open={open}
          handleClose={handleClose}
          onBlock1EntryAdded={handleAddBlock1Entry}
          editBlock1Entry={editBlock1Entry}
          onBlock1EntryEdited={handleBlock1EntryEdited}
        />
      </Box>
      <Box
        m="20px 0 0 0"
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
        <DataGrid rows={rows} columns={columns} autoHeight slots={{ toolbar: GridToolbar }}/>
      </Box>

      <Block1DeleteDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteBlock1Entry}
        isBulkDelete={isBulkDelete}
      />
    </Box>
  );
};

export default Block1;