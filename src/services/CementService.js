import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/cement";

export const listCementEntries = () => axios.get(REST_API_BASE_URL, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const createCementEntry = (cement) => axios.post(REST_API_BASE_URL, cement, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const updateCementEntry = (cementId, cement) => axios.put(`${REST_API_BASE_URL}/${cementId}`, cement, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const getCementEntry = (cementId) => axios.get(`${REST_API_BASE_URL}/${cementId}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const deleteCementEntry = (cementId) => axios.delete(`${REST_API_BASE_URL}/${cementId}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const deleteAllCementEntries = () => axios.delete(`${REST_API_BASE_URL}/deleteAll`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const getCementTotalOutQuantity = () => axios.get(`${REST_API_BASE_URL}/total-out-quantity`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const getCementCurrentStock = () => axios.get(`${REST_API_BASE_URL}/current-stock`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});