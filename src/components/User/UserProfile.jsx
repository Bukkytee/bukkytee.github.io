import { useEffect, useState } from "react";
import { getYourProfile } from "../../services/UserService";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserProfile = () => {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await getYourProfile(token);
            setProfileInfo(response.user);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3, maxWidth: 600, margin: '0 auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Profile Information
            </Typography>

            <Typography variant="body1">
                <strong>Full Name:</strong> {profileInfo.fullName || 'N/A'}
            </Typography>

            <Typography variant="body1">
                <strong>Email:</strong> {profileInfo.email || 'N/A'}
            </Typography>

            <Typography variant="body1">
                <strong>Location:</strong> {profileInfo.location || 'N/A'}
            </Typography>

            <Typography variant="body1">
                <strong>Username:</strong> {profileInfo.username || 'N/A'}
            </Typography>

            {profileInfo.role === "ADMIN" && (
                <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    to={`/update-user/${profileInfo.id}`} 
                    sx={{ mt: 3 }}
                >
                    Update This Profile
                </Button>
            )}
        </Box>
    );
};

export default UserProfile;