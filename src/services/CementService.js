import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/cement";

export const listCementEntries = () => axios.get(REST_API_BASE_URL);

export const createCementEntry = (cement) => axios.post(REST_API_BASE_URL, cement);

export const updateCementEntry = (cementId, cement) => axios.put(REST_API_BASE_URL + "/" + cementId, cement);

export const getCementEntry = (cementId) => axios.get(REST_API_BASE_URL + "/" + cementId);

export const deleteCementEntry = (cementId) => axios.delete(REST_API_BASE_URL + "/" + cementId);

export const deleteAllCementEntries = () => axios.delete(`${REST_API_BASE_URL}/deleteAll`);

export const getCementTotalOutQuantity = () => axios.get(`${REST_API_BASE_URL}/total-out-quantity`);