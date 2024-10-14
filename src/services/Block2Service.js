import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/block2";

export const listBlock2Entries = () => axios.get(REST_API_BASE_URL, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const createBlock2Entry = (block2) => axios.post(REST_API_BASE_URL, block2, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const updateBlock2Entry = (block2Id, block2) => axios.put(`${REST_API_BASE_URL}/${block2Id}`, block2, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const getBlock2Entry = (block2Id) => axios.get(`${REST_API_BASE_URL}/${block2Id}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const deleteBlock2Entry = (block2Id) => axios.delete(`${REST_API_BASE_URL}/${block2Id}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const deleteAllBlock2Entries = () => axios.delete(`${REST_API_BASE_URL}/deleteAll`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const getBlock2TotalOutQuantity = () => axios.get(`${REST_API_BASE_URL}/total-out-quantity`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const getBlock2CurrentStock = () => axios.get(`${REST_API_BASE_URL}/current-stock`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});