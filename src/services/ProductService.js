import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/product";

export const listProducts = () => axios.get(REST_API_BASE_URL, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const createProduct = (product) => axios.post(REST_API_BASE_URL, product, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const updateProduct = (productId, product) => axios.put(`${REST_API_BASE_URL}/${productId}`, product, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const getProduct = (productId) => axios.get(`${REST_API_BASE_URL}/${productId}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const deleteProduct = (productId) => axios.delete(`${REST_API_BASE_URL}/${productId}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const deleteAllProducts = () => axios.delete(`${REST_API_BASE_URL}/deleteAll`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});