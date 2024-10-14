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

const UserDeleteDialog = ({ open, onClose, onConfirm }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Dialog
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
        >

        <DialogTitle 
            textAlign="center" 
            variant="h3" 
            margin="10px 0" 
        >
            Delete User
        </DialogTitle>

        <DialogContent>
            <Typography 
                variant="h5" 
                textAlign="center" 
                margin="10px 0"
            >
                Are you sure you want to delete this user? This action cannot be undone once confirmed.
            </Typography>

            <DialogActions 
                sx={{
                     mt: "20px", 
                     float: "right" 
                    }}
            >
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
    )
};

export default UserDeleteDialog;