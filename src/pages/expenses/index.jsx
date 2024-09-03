import { Box, Button, useTheme, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../components/Header";
import {
  listExpensesRecord,
  getTotalBalanceSum,
  getExpensesRecord,
  deleteExpensesRecord,
  deleteAllExpensesRecords,
} from "../../services/ExpenseService";
import ExpensesRecordForm from "../../components/ExpensesRecordForm";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DeleteDialog from "../../components/SalesDeleteDialog";

const Expenses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [totalBalanceSum, setTotalBalanceSum] = useState(0);
  const [editRecord, setEditRecord] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditRecord(null);
  };

  const handleOpenDialog = (id = null) => {
    setDeleteRecord(id);
    setIsBulkDelete(id === null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    listExpensesRecord()
      .then((response) => {
        const data = response.data.map((item) => ({
          id: item.id,
          ...item,
        }));
        setRows(data);

        getTotalBalanceSum()
          .then((response) => {
            setTotalBalanceSum(response.data);
          })
          .catch((error) => {
            console.error("Error fetching total balance sum: ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleAddRecord = (newExpensesRecord) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows, newExpensesRecord];

      getTotalBalanceSum()
        .then((response) => {
          setTotalBalanceSum(response.data);
        })
        .catch((error) => {
          console.error("Error fetching total balance sum: ", error);
        });
      return updatedRows;
    });
  };

  const handleEditRecord = (row) => {
    getExpensesRecord(row.id)
      .then((response) => {
        setEditRecord(response.data);
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching record by ID: ", error);
      });
  };

  const handleDeleteRecord = () => {
    if (isBulkDelete) {
      deleteAllExpensesRecords()
        .then(() => {
          setRows([]);
          setTotalBalanceSum(0);
          setOpenDialog(false);
        })
        .catch((error) => {
          console.error("Error deleting all records: ", error);
        });
    } else if (deleteRecord) {
      deleteExpensesRecord(deleteRecord)
        .then(() => {
          setRows((prevRows) =>
            prevRows.filter((row) => row.id !== deleteRecord)
          );
          getTotalBalanceSum()
            .then((response) => {
              setTotalBalanceSum(response.data);
            })
            .catch((error) => {
              console.error("Error fetching total balance sum: ", error);
            });
          setDeleteRecord(null);
          setOpenDialog(false);
        })
        .catch((error) => {
          console.error("Error deleting record: ", error);
        });
    }
  };

  const handleRecordEdited = (updatedRecord) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((record) =>
        record.id === updatedRecord.id
          ? { ...record, ...updatedRecord }
          : record
      );

      getTotalBalanceSum()
        .then((response) => {
          setTotalBalanceSum(response.data);
        })
        .catch((error) => {
          console.error("Error fetching total balance sum: ", error);
        });

      console.log(updatedRecord);
      return updatedRows;
    });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "type", headerName: "Type", flex: 0.5 },
    { field: "quantity", headerName: "Quantity", flex: 0.5 },
    { field: "cost", headerName: "Cost", flex: 0.5 },
    { field: "expensesDesc", headerName: "Description", flex: 1 },
    { field: "supplierName", headerName: "Supplier", flex: 0.5 },
    { field: "date", headerName: "Date", flex: 0.5 },
    { field: "totalBalance", headerName: "Total Balance", flex: 0.75 },
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
            onClick={() => handleEditRecord(params.row)}
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
          Add Record
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
          Delete All Records
        </Button>
        <ExpensesRecordForm
          open={open}
          handleClose={handleClose}
          onRecordAdded={handleAddRecord}
          editRecord={editRecord}
          onRecordEdited={handleRecordEdited}
        />
      </Box>
      <Header title="EXPENSES" subtitle="Expenses transactions listed here" />
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
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>

      <Box display="flex" justifyContent="space-between" p={2}>
        <Typography variant="h5">Total Expenses Balance: </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          ₦{totalBalanceSum}
        </Typography>
      </Box>

      <DeleteDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteRecord}
        isBulkDelete={isBulkDelete}
      ></DeleteDialog>
    </Box>
  );
};

export default Expenses;
