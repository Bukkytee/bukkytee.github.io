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
import { createCementEntry, updateCementEntry } from "../../services/CementService";

// TODO: Validation Schema

const CementForm = ({
  open,
  handleClose,
  onCementEntryAdded,
  onCementEntryEdited,
  editCementEntry,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const editMode = Boolean(editCementEntry);

  const initialValues = {
    date: editCementEntry?.date || "",
    description: editCementEntry?.description || "",
    inQuantity: editCementEntry?.inQuantity || "",
    outQuantity: editCementEntry?.outQuantity || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (editMode) {
        const response = await updateCementEntry(editCementEntry.id, values);
        onCementEntryEdited(response.data);
      } else {
        const response = await createCementEntry(values);
        onCementEntryAdded(response.data);
      }
      handleClose();
    } catch (error) {
      console.error(
        `Failed to ${editMode ? "update" : "create"} cement entry: `,
        error
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle textAlign="center" variant="h3" margin="10px 0">
        {editMode ? "Edit Cement Entry" : "Add New Cement Entry"}
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
                  type="date"
                  label="Date"
                  name="date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.date}
                  error={!!touched.date && !!errors.date}
                  helperText={touched.date && errors.date}
                  sx={{ gridColumn: "span 2" }}
                  InputLabelProps={{
                    style: {
                      marginTop: "4px",
                    },
                  }}
                  InputProps={{
                    style: {
                      padding: "12px 0",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
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
                  type="number"
                  label="In"
                  name="inQuantity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.inQuantity}
                  error={!!touched.inQuantity && !!errors.inQuantity}
                  helperText={touched.inQuantity && errors.inQuantity}
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
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Out"
                  name="outQuantity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.outQuantity}
                  error={!!touched.outQuantity && !!errors.outQuantity}
                  helperText={touched.outQuantity && errors.outQuantity}
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

export default CementForm;
