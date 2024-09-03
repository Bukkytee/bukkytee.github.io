import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Formik } from "formik";
import { createExpensesRecord, updateExpensesRecord } from "../services/ExpenseService";

// TODO: Validation Schema

const ExpensesRecordForm = ({ open, handleClose, onRecordAdded, onRecordEdited, editRecord }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const editMode = Boolean(editRecord);

    const initialValues = {
        type: editRecord?.type || "",
        quantity: editRecord?.quantity || "",
        cost: editRecord?.cost || "",
        expensesDesc: editRecord?.expensesDesc || "",
        supplierName: editRecord?.supplierName || "",
        date: editRecord?.date || ""
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (editMode) {
                const response = await updateExpensesRecord(editRecord.id, values);
                onRecordEdited(response.data)
            }
            else{
                const response = await createExpensesRecord(values);
                onRecordAdded(response.data);
            }
            handleClose();
        } catch (error) {
            console.error(`Failed to ${editMode ? "update" : "create"} expenses record: `, error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth = "md"
            fullWidth
        >
                <DialogTitle textAlign="center" variant="h3" margin="10px 0">
                    {editMode ? "Edit Expenses Record" : "Add New Expenses Record"}</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="20px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    gridColumn="span 4">
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
                                            sx={{ gridColumn: "span 2"}}
                                            InputLabelProps={{
                                                style: { 
                                                    marginTop: '4px',
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    padding: "8px 12px"
                                                }
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
                                            sx={{ gridColumn: "span 2"}}
                                            inputProps={{ min: 0 }}
                                            InputLabelProps={{
                                                style: { 
                                                    marginTop: '4px',
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    padding: "8px 0",
                                                    alignItems: "center"
                                                }
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Description"
                                            name="expensesDesc"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.expensesDesc}
                                            error={!!touched.expensesDesc && !!errors.expensesDesc}
                                            helperText={touched.expensesDesc && errors.expensesDesc}
                                            sx={{ gridColumn: "span 2"}}
                                            InputLabelProps={{
                                                style: { 
                                                    marginTop: '4px',
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    padding: "8px 0"
                                                }
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Supplier"
                                            name="supplierName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.supplierName}
                                            error={!!touched.supplierName && !!errors.supplierName}
                                            helperText={touched.supplierName && errors.supplierName}
                                            sx={{ gridColumn: "span 2"}}
                                            InputLabelProps={{
                                                style: { 
                                                    marginTop: '4px',
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    padding: "8px 0"
                                                }
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="number"
                                            label="Cost"
                                            name="cost"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.cost}
                                            error={!!touched.cost && !!errors.cost}
                                            helperText={touched.cost && errors.cost}
                                            sx={{ gridColumn: "span 2"}}
                                            inputProps={{ min: 0 }}
                                            InputLabelProps={{
                                                style: { 
                                                    marginTop: '4px',
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    padding: "10px 0"
                                                }
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
                                                    padding: "10px 0"
                                                }
                                            }}
                                        />
                                    </Box>
                                    <DialogActions sx={{mt: "20px", float: "right"}}>
                                        <Button onClick={handleClose} sx={{color: colors.redAccent[400], padding: "8px 12px"}}>Cancel</Button>
                                        <Button type="submit" sx={{color: colors.gray[100], backgroundColor: colors.blueAccent[700], padding: "12px 16px"}}>{editMode ? "Update" : "Submit"}</Button>
                                    </DialogActions>
                            </form>
                        )}
                    </Formik>
                </DialogContent>  
            </Dialog>
    )
}

export default ExpensesRecordForm;