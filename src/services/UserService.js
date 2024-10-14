import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

export const login = (username, password) => axios.post(
    `${REST_API_BASE_URL}/auth/login`,
    { username, password }
);

// export const resetPassword = (resetToken, newPassword) => axios.post(
//     `${REST_API_BASE_URL}/auth/reset-password`,
//      { password: newPassword }, 
//     {
//         params: { resetToken }, 
//     }
// );


export const createUser = (user) => axios.post(
    `${REST_API_BASE_URL}/auth/register`,
    user, 
    {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
);

export const getAllUsers = () => axios.get(
    `${REST_API_BASE_URL}/admin/get-all-users`, 
    {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
);

export const getYourProfile = () => 
     axios.get(
    `${REST_API_BASE_URL}/adminuser/get-info`, 
    {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    } 
);


export const getUser = (userId) => axios.get(
    `${REST_API_BASE_URL}/admin/get-users/${userId}`, 
    {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
);

export const deleteUser = (userId) => axios.delete(
    `${REST_API_BASE_URL}/admin/delete/${userId}`, 
    {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
);

export const updateUser = (userId, user) => axios.put(
    `${REST_API_BASE_URL}/admin/update/${userId}`,
    user,
    {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
);

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return Boolean(token);
};

export const isAdmin = () => {
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
};

export const isUser = () => {
    const role = localStorage.getItem('role');
    return role === 'USER';
};

export const adminOnly = () => isAuthenticated() && isAdmin();

