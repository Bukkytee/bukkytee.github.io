import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/block1";

export const listBlock1Entries = () => axios.get(REST_API_BASE_URL, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const createBlock1Entry = (block1) => axios.post(REST_API_BASE_URL, block1, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const updateBlock1Entry = (block1Id, block1) => axios.put(`${REST_API_BASE_URL}/${block1Id}`, block1, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const getBlock1Entry = (block1Id) => axios.get(`${REST_API_BASE_URL}/${block1Id}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const deleteBlock1Entry = (block1Id) => axios.delete(`${REST_API_BASE_URL}/${block1Id}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const deleteAllBlock1Entries = () => axios.delete(`${REST_API_BASE_URL}/deleteAll`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const getBlock1TotalOutQuantity = () => axios.get(`${REST_API_BASE_URL}/total-out-quantity`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const getBlock1CurrentStock = () => axios.get(`${REST_API_BASE_URL}/current-stock`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});