import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/block2";

export const listBlock2Entries = () => axios.get(REST_API_BASE_URL);

export const createBlock2Entry = (block2) => axios.post(REST_API_BASE_URL, block2);

export const updateBlock2Entry = (block2Id, block2) => axios.put(REST_API_BASE_URL + "/" + block2Id, block2);

export const getBlock2Entry = (block2Id) => axios.get(REST_API_BASE_URL + "/" + block2Id);

export const deleteBlock2Entry = (block2Id) => axios.delete(REST_API_BASE_URL + "/" + block2Id);

export const deleteAllBlock2Entries = () => axios.delete(`${REST_API_BASE_URL}/deleteAll`);

export const getBlock2TotalOutQuantity = () => axios.get(`${REST_API_BASE_URL}/total-out-quantity`);