import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { listProducts, getProduct, updateProduct, deleteAllProducts, deleteProduct } from "../../services/ProductService";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ProductForm from "./ProductForm";
import ProductDeleteDialog from "./ProductDeleteDialog";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { isAdmin } from "../../services/UserService";

const Product = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [ rows, setRows ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ editProduct, setEditProduct ] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteProductItem, setDeleteProductItem] = useState(null);
    const [isBulkDelete, setIsBulkDelete] = useState(false);

    const admin = isAdmin();

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        setEditProduct(null);
      };
    
      const handleOpenDialog = (id = null) => {
          setDeleteProductItem(id);
          setIsBulkDelete(id === null);
          setOpenDialog(true);
      };
    
      const handleCloseDialog = () => {
          setOpenDialog(false);
      };

      useEffect(() => {
        listProducts().then((response) => {
            const data = response.data.map((item) => ({
                id: item.id,
                ...item,
            }));
            setRows(data);
        }).catch((error) => {
            console.error("Error fetching data: ", error);
        });
      }, []);

      const handleAddProduct = (newProduct) => {
        setRows((prevRows) => {
          const updatedRows = [...prevRows, newProduct];
          return updatedRows;
        });
      };

      const handleEditProduct = (row) => {
        getProduct(row.id)
          .then((response) => {
            setEditProduct(response.data);
            setOpen(true);
          })
          .catch((error) => {
            console.error("Error fetching product by ID: ", error);
          });
      };

      const handleProductEdited = (updatedProduct) => {
        updateProduct(updatedProduct.id, updatedProduct).then(() => {
          listProducts().then((response) => {
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
        console.error("Error updating product: ", error); 
       })
      };

      const handleDeleteProduct = () => {
        if (isBulkDelete) {
          deleteAllProducts()
            .then(() => {
              setRows([]);
              setOpenDialog(false);
            })
            .catch((error) => {
              console.error("Error deleting all products: ", error);
            });
        } else if (deleteProduct) {
            deleteProduct(deleteProductItem)
            .then(() => {
              listProducts().then((response) => {
                const data = response.data.map((item) => ({
                  id: item.id,
                  ...item,
                }));
                setRows(data);
              })
              .catch((error) => {
                console.error("Error fetching updated products: ", error); 
              });
    
              setDeleteProductItem(null);
              setOpenDialog(false);
            })
            .catch((error) => {
              console.error("Error deleting products: ", error);
            });
        }
      };

      const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "productName", headerName: "Product Name", flex: 0.5 },
        { field: "productDesc", headerName: "Product Description", flex: 1 },
        { field: "category", headerName: "Category", flex: 0.5 },
        { field: "supplierName", headerName: "Supplier", flex: 0.5 },
        { field: "cost", headerName: "Cost", flex: 0.5 },
        { field: "quantity", headerName: "Quantity", flex: 0.5 },
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
                      onClick={() => handleEditProduct(params.row)}
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
                Add Product
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
              Delete All Products
            </Button>
          )}

                <ProductForm
                open={open}
                handleClose={handleClose}
                onProductAdded={handleAddProduct}
                editProduct={editProduct}
                onProductEdited={handleProductEdited}
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

            <ProductDeleteDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onConfirm={handleDeleteProduct}
                isBulkDelete={isBulkDelete}
            />
        </Box>
      );
}

export default Product;