import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { isAdmin, login } from "../../services/UserService";
import { TextField, Button, Typography, Box, Alert, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const initialValues = {
    username: "",
    password: ""
}

const userSchema = yup.object().shape({
    username: yup.string().required("This field is required!"),
    password: yup.string().required("This field is required!"),
});

const LoginPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const handleFormSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await login(values.username, values.password);
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                
                navigate('/dashboard');
            } else {
                setErrors({ username: response.message });
            } 
        } catch (error) {
            setErrors({ username: error.message });
            setTimeout(() => {
                setErrors({});
            }, 5000);
        } finally {
            setSubmitting(false);
        }

    }

    const formik = useFormik({
        initialValues,
        validationSchema: userSchema,
        onSubmit: handleFormSubmit 
    });

    return (
        <Box sx={{
            maxWidth: "400px",
            margin: "0 auto",
            padding: "20px",
            borderRadius: "5px",
            backgroundColor: colors.primary[500]
        }}
        >
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            {formik.errors.username && <Alert severity="error">{formik.errors.username}</Alert>}
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="username"
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default LoginPage;
