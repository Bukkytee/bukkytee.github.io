import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { createProduct, updateProduct } from "../../services/ProductService";
import { Formik } from "formik";

const ProductForm = ({
    open,
    handleClose,
    onProductAdded,
    onProductEdited,
    editProduct,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const editMode = Boolean(editProduct);

    const initialValues = {
        productName: editProduct?.productName || "",
        productDesc: editProduct?.productDesc || "",
        category: editProduct?.category || "",
        supplierName: editProduct?.supplierName || "",
        cost: editProduct?.cost || "",
        quantity: editProduct?.quantity || "",
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
          if (editMode) {
            const response = await updateProduct(editProduct.id, values);
            onProductEdited(response.data);
          } else {
            const response = await createProduct(values);
            onProductAdded(response.data);
          }
          handleClose();
        } catch (error) {
          console.error(
            `Failed to ${editMode ? "update" : "create"} product: `,
            error
          );
        } finally {
          setSubmitting(false);
        }
      };

      return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle textAlign="center" variant="h3" margin="10px 0">
                {editMode ? "Edit Product" : "Add New Product"}
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
                        label="Product Name"
                        name="productName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.productName}
                        error={!!touched.productName && !!errors.productName}
                        helperText={touched.productName && errors.productName}
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
                        label="Product Description"
                        name="productDesc"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.productDesc}
                        error={!!touched.productDesc && !!errors.productDesc}
                        helperText={touched.productDesc && errors.productDesc}
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
                        label="Category"
                        name="category"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.category}
                        error={!!touched.category && !!errors.category}
                        helperText={touched.category && errors.category}
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
                        type="text"
                        label="Supplier"
                        name="supplierName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.supplierName}
                        error={!!touched.supplierName && !!errors.supplierName}
                        helperText={touched.supplierName && errors.supplierName}
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
                        type="number"
                        label="Cost"
                        name="cost"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.cost}
                        error={!!touched.cost && !!errors.cost}
                        helperText={touched.cost && errors.cost}
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
                        type="number"
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
}

export default ProductForm;