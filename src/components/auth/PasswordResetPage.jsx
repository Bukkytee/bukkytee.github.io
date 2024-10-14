// import React from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { Box, Typography, TextField, Button, Alert, useTheme } from '@mui/material';
// import { tokens } from '../../theme';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { resetPassword } from '../../services/UserService';

// const initialValues = {
//     temporaryPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   }

// // Validation schema
// const validationSchema = yup.object().shape({
//   temporaryPassword: yup.string().required('Temporary password is required'),
//   newPassword: yup.string()
//     .min(8, 'Password must be at least 8 characters long')
//     .required('New password is required'),
//   confirmPassword: yup.string()
//     .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
//     .required('Confirm password is required'),
// });


// const PasswordResetForm = () => {
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const navigate = useNavigate();

//     const [searchParams] = useSearchParams();
//     console.log(searchParams.toString());
//     const resetToken = searchParams.get("token");
//     console.log(resetToken);

//     const handleFormSubmit = (values) => {
//       const { newPassword } = values;

//         resetPassword(resetToken, newPassword)
//         .then((response) => {
//             console.log("Password reset successful!", response.data);

//             navigate("/login");
            
//         }).catch((error) => {
//             console.error("Error resetting password:", error.response ? error.response.data : error.message);
//         })
//       }
    
//   const formik = useFormik({
//     initialValues,
//     validationSchema: validationSchema,
//     onSubmit: handleFormSubmit
//   });

//   return (
//     <Box
//       sx={{
//         maxWidth: '400px',
//         margin: '0 auto',
//         padding: '20px',
//         borderRadius: '5px',
//         backgroundColor: colors.primary[500]
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Reset Password
//       </Typography>

//       {formik.errors.temporaryPassword && (
//         <Alert severity="error">{formik.errors.temporaryPassword}</Alert>
//       )}

//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           label="Temporary Password"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="temporaryPassword"
//           type="text"
//           value={formik.values.temporaryPassword}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.temporaryPassword &&
//             Boolean(formik.errors.temporaryPassword)
//           }
//           helperText={
//             formik.touched.temporaryPassword && formik.errors.temporaryPassword
//           }
//         />

//         <TextField
//           label="New Password"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="newPassword"
//           type="password"
//           value={formik.values.newPassword}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.newPassword && Boolean(formik.errors.newPassword)
//           }
//           helperText={formik.touched.newPassword && formik.errors.newPassword}
//         />

//         <TextField
//           label="Confirm Password"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="confirmPassword"
//           type="password"
//           value={formik.values.confirmPassword}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.confirmPassword &&
//             Boolean(formik.errors.confirmPassword)
//           }
//           helperText={
//             formik.touched.confirmPassword && formik.errors.confirmPassword
//           }
//         />

//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           Reset Password
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default PasswordResetForm;
