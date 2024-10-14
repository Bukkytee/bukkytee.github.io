import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import { createUser, updateUser } from "../../services/UserService";

const UserForm = ({ open, handleClose, onUserAdded, onUserEdited, editUser }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const editMode = Boolean(editUser);

    const initialValues = {
        fullName: editUser?.fullName || "",
        email: editUser?.email || "",
        location: editUser?.location || "",
        username: editUser?.username || "",
        // password: editUser?.password || "",
        role: editUser?.role || "",     
    }

    const userSchema = yup.object().shape({
        fullName: yup.string().required("This field is required"),
        email: yup.string().email("Invalid email").required("This field is required"),
        location: yup.string().required("This field is required"),
        username: yup.string().required("This field is required"),
        // password: yup.string().min(5, "Password must have a minimum of 5 characters!").required("This field is required"),
        role: yup.string().required("This field is required"),
    })

    const handleFormSubmit = async (values, { setSubmitting }) => {
        try {
            const token = localStorage.getItem("token");
            if (editMode) {
                const response = await updateUser(editUser.id, values, token);
                onUserEdited(response.data);  
            } else {

                const response = await createUser(values, token);
                onUserAdded(response.data); 
            }
            handleClose();
        } catch (error) {
            console.error(`Failed to ${editMode ? "update" : "create"} user`, error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle
                textAlign="center"
                variant="h3"
                margin="10px 0"
            >
                {editMode ? "Edit User Details" : "Create User"}
            </DialogTitle>

            <DialogContent>
                <Formik 
                    initialValues={initialValues} 
                    onSubmit={handleFormSubmit}
                    validationSchema={userSchema}
                >
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
                            label="Full Name"
                            name="fullName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.fullName}
                            error={!!touched.fullName && !!errors.fullName}
                            helperText={touched.fullName && errors.fullName}
                            sx={{ gridColumn: "span 4" }}
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
                            type="email"
                            label="Email"
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            error={!!touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
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
                            label="Location"
                            name="location"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.location}
                            error={!!touched.location && !!errors.location}
                            helperText={touched.location && errors.location}
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
                            label="Username"
                            name="username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            error={!!touched.username && !!errors.username}
                            helperText={touched.username && errors.username}
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

                            {/* <TextField
                            fullWidth
                            variant="filled"
                            type="password"
                            label="Password"
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            error={!!touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 2" }}
                            inputProps={{ min: 5 }}
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
                            /> */}

                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Role"
                            name="role"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.role}
                            error={!!touched.role && !!errors.role}
                            helperText={touched.role && errors.role}
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
                                {editMode ? "Update" : "Create"}
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </DialogContent>

        </Dialog>
    )
};

export default UserForm;