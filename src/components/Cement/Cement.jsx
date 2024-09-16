import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { listCementEntries, getCementEntry, deleteCementEntry, deleteAllCementEntries, updateCementEntry } from "../../services/CementService";
import CementForm from "./CementForm";
import CementDeleteDialog from "./CementDeleteDialog";

const Cement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editCementEntry, setEditCementEntry] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteCement, setDeleteCement] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditCementEntry(null);
  };

  const handleOpenDialog = (id = null) => {
      setDeleteCement(id);
      setIsBulkDelete(id === null);
      setOpenDialog(true);
  };

  const handleCloseDialog = () => {
      setOpenDialog(false);
  };

  useEffect(() => {
    listCementEntries()
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

  const handleAddCementEntry = (newCementEntry) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows, newCementEntry];
      return updatedRows;
    });
  };

  const handleEditCementEntry = (row) => {
    getCementEntry(row.id)
      .then((response) => {
        setEditCementEntry(response.data);
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching cement by ID: ", error);
      });
  };

  const handleCementEntryEdited = (updatedCementEntry) => {
    updateCementEntry(updatedCementEntry.id, updatedCementEntry).then(() => {
      listCementEntries().then((response) => {
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
    console.error("Error updating cement entry: ", error); 
   })
  };

  const handleDeleteCementEntry = () => {
    if (isBulkDelete) {
      deleteAllCementEntries()
        .then(() => {
          setRows([]);
          setOpenDialog(false);
        })
        .catch((error) => {
          console.error("Error deleting all cement entries: ", error);
        });
    } else if (deleteCement) {
        deleteCementEntry(deleteCement)
        .then(() => {
          listCementEntries().then((response) => {
            const data = response.data.map((item) => ({
              id: item.id,
              ...item,
            }));
            setRows(data);
          })
          .catch((error) => {
            console.error("Error fetching updated cement entries: ", error); 
          });

          setDeleteCement(null);
          setOpenDialog(false);
        })
        .catch((error) => {
          console.error("Error deleting cement entry: ", error);
        });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "date", headerName: "Date", flex: 0.5 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "inQuantity", headerName: "In", flex: 0.5 },
    { field: "outQuantity", headerName: "Out", flex: 0.5 },
    { field: "currentStock", headerName: "Balance (Current Stock)", flex: 0.75 },
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
              onClick={() => handleEditCementEntry(params.row)}
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

        <CementForm
          open={open}
          handleClose={handleClose}
          onCementEntryAdded={handleAddCementEntry}
          editCementEntry={editCementEntry}
          onCementEntryEdited={handleCementEntryEdited}
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
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          slots={{ toolbar: GridToolbar }}
        />
      </Box>

      <CementDeleteDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteCementEntry}
        isBulkDelete={isBulkDelete}
      />
    </Box>
  );
};

export default Cement;
