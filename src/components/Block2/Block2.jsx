import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  listBlock2Entries,
  getBlock2Entry,
  deleteBlock2Entry,
  deleteAllBlock2Entries,
  updateBlock2Entry
} from "../../services/Block2Service";
import Block2Form from "./Block2Form";
import Block2DeleteDialog from "./Block2DeleteDialog";
import { isAdmin } from "../../services/UserService";

const Block2 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editBlock2Entry, setEditBlock2Entry] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteBlock2, setDeleteBlock2] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const admin = isAdmin();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditBlock2Entry(null);
  };

  const handleOpenDialog = (id = null) => {
    setDeleteBlock2(id);
    setIsBulkDelete(id === null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    listBlock2Entries()
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

  const handleAddBlock2Entry = (newBlock2Entry) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows, newBlock2Entry];
      return updatedRows;
    });
  };

  const handleEditBlock2Entry = (row) => {
    getBlock2Entry(row.id)
      .then((response) => {
        setEditBlock2Entry(response.data);
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching block by ID: ", error);
      });
  };

  const handleBlock2EntryEdited = (updatedBlock2Entry) => {
    updateBlock2Entry(updatedBlock2Entry.id, updatedBlock2Entry).then(() => {
      listBlock2Entries().then((response) => {
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

  const handleDeleteBlock2Entry = () => {
    if (isBulkDelete) {
      deleteAllBlock2Entries()
        .then(() => {
          setRows([]);
          setOpenDialog(false);
        })
        .catch((error) => {
          console.error("Error deleting all block2 entries: ", error);
        });
    } else if (deleteBlock2) {
      deleteBlock2Entry(deleteBlock2)
      .then(() => {
        listBlock2Entries().then((response) => {
          const data = response.data.map((item) => ({
            id: item.id,
            ...item,
          }));
          setRows(data);
        })
        .catch((error) => {
          console.error("Error fetching updated block2 entries: ", error); 
        });

        setDeleteBlock2(null);
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Error deleting block2 entry: ", error);
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
                onClick={() => handleEditBlock2Entry(params.row)}
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

        <Block2Form
          open={open}
          handleClose={handleClose}
          onBlock2EntryAdded={handleAddBlock2Entry}
          editBlock2Entry={editBlock2Entry}
          onBlock2EntryEdited={handleBlock2EntryEdited}
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

      <Block2DeleteDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteBlock2Entry}
        isBulkDelete={isBulkDelete}
      />
    </Box>
  );
};

export default Block2;