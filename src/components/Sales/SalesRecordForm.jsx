import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import {
  createSalesRecord,
  updateSalesRecord,
} from "../../services/SaleService";

// TODO: Validation Schema

const SalesRecordForm = ({
  open,
  handleClose,
  onRecordAdded,
  onRecordEdited,
  editRecord,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const editMode = Boolean(editRecord);

  const initialValues = {
    type: editRecord?.type || "",
    quantity: editRecord?.quantity || "",
    rate: editRecord?.rate || "",
    salesDesc: editRecord?.salesDesc || "",
    customerName: editRecord?.customerName || "",
    date: editRecord?.date || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (editMode) {
        const response = await updateSalesRecord(editRecord.id, values);
        onRecordEdited(response.data);
      } else {
        const response = await createSalesRecord(values);
        onRecordAdded(response.data);
      }
      handleClose();
    } catch (error) {
      console.error(
        `Failed to ${editMode ? "update" : "create"} sales record: `,
        error
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle textAlign="center" variant="h3" margin="10px 0">
        {editMode ? "Edit Sales Record" : "Add New Sales Record"}
      </DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                gridColumn="span 4"
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Type"
                  name="type"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.type}
                  error={!!touched.type && !!errors.type}
                  helperText={touched.type && errors.type}
                  sx={{ gridColumn: "span 2" }}
                  InputLabelProps={{
                    style: {
                      marginTop: "4px",
                    },
                  }}
                  InputProps={{
                    style: {
                      padding: "8px 12px",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  min="0"
                  label="Quantity"
                  name="quantity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.quantity}
                  error={!!touched.quantity && !!errors.quantity}
                  helperText={touched.quantity && errors.quantity}
                  sx={{ gridColumn: "span 2" }}
                  inputProps={{ min: 0 }}
                  InputLabelProps={{
                    style: {
                      marginTop: "4px",
                    },
                  }}
                  InputProps={{
                    style: {
                      padding: "8px 0",
                      alignItems: "center",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  name="salesDesc"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.salesDesc}
                  error={!!touched.salesDesc && !!errors.salesDesc}
                  helperText={touched.salesDesc && errors.salesDesc}
                  sx={{ gridColumn: "span 2" }}
                  InputLabelProps={{
                    style: {
                      marginTop: "4px",
                    },
                  }}
                  InputProps={{
                    style: {
                      padding: "8px 0",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Customer"
                  name="customerName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.customerName}
                  error={!!touched.customerName && !!errors.customerName}
                  helperText={touched.customerName && errors.customerName}
                  sx={{ gridColumn: "span 2" }}
                  InputLabelProps={{
                    style: {
                      marginTop: "4px",
                    },
                  }}
                  InputProps={{
                    style: {
                      padding: "8px 0",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Rate"
                  name="rate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.rate}
                  error={!!touched.rate && !!errors.rate}
                  helperText={touched.rate && errors.rate}
                  sx={{ gridColumn: "span 2" }}
                  inputProps={{ min: 0 }}
                  InputLabelProps={{
                    style: {
                      marginTop: "4px",
                    },
                  }}
                  InputProps={{
                    style: {
                      padding: "10px 0",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  label="Date"
                  name="date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.date}
                  error={!!touched.date && !!errors.date}
                  helperText={touched.date && errors.date}
                  sx={{
                    gridColumn: "span 2",
                  }}
                  InputProps={{
                    style: {
                      padding: "10px 0",
                    },
                  }}
                />
              </Box>
              <DialogActions sx={{ mt: "20px", float: "right" }}>
                <Button
                  onClick={handleClose}
                  sx={{ color: colors.redAccent[400], padding: "8px 12px" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  sx={{
                    color: colors.gray[100],
                    backgroundColor: colors.blueAccent[700],
                    padding: "12px 16px",
                  }}
                >
                  {editMode ? "Update" : "Submit"}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default SalesRecordForm;
