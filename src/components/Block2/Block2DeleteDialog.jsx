import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Block2DeleteDialog = ({
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
        {isBulkDelete ? "Delete All Block Entries" : "Delete Block Entry"}
      </DialogTitle>

      <DialogContent>
        <Typography variant="h5" textAlign="center" margin="10px 0">
          {isBulkDelete
            ? "Do you want to delete all block entries? This action can't be undone once confirmed"
            : "Do you want to delete this block entry? This action can't be undone once confirmed"}
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
};

export default Block2DeleteDialog;
