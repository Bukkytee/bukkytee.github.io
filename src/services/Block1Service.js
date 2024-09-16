import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/block1";

export const listBlock1Entries = () => axios.get(REST_API_BASE_URL);

export const createBlock1Entry = (block1) => axios.post(REST_API_BASE_URL, block1);

export const updateBlock1Entry = (block1Id, block1) => axios.put(REST_API_BASE_URL + "/" + block1Id, block1);

export const getBlock1Entry = (block1Id) => axios.get(REST_API_BASE_URL + "/" + block1Id);

export const deleteBlock1Entry = (block1Id) => axios.delete(REST_API_BASE_URL + "/" + block1Id);

export const deleteAllBlock1Entries = () => axios.delete(`${REST_API_BASE_URL}/deleteAll`);

export const getBlock1TotalOutQuantity = () => axios.get(`${REST_API_BASE_URL}/total-out-quantity`);