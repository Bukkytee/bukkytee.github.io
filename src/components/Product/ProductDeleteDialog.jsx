import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React from "react";

const ProductDeleteDialog = ({
    open,
    onClose,
    onConfirm,
    isBulkDelete = false,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle textAlign="center" variant="h3" margin="10px 0">
          {isBulkDelete ? "Delete All Products" : "Delete Product"}
        </DialogTitle>
  
        <DialogContent>
          <Typography variant="h5" textAlign="center" margin="10px 0">
            {isBulkDelete
              ? "Do you want to delete all products? This action can't be undone once confirmed"
              : "Do you want to delete this product? This action can't be undone once confirmed"}
          </Typography>
  
          <DialogActions sx={{ mt: "20px", float: "right" }}>
            <Button
              onClick={onClose}
              sx={{ color: colors.gray[100], padding: "8px 12px" }}
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              sx={{
                color: colors.gray[100],
                backgroundColor: colors.redAccent[700],
                padding: "12px 16px",
                "&:hover": {
                  backgroundColor: colors.redAccent[500],
                },
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
}

export default ProductDeleteDialog;