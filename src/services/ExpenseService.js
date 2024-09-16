import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/expenses";

const TOTAL_BALANCE_SUM_URL = "http://localhost:8080/api/expenses/total-balance";

const TOTAL_BALANCE_SUM_BY_MONTH_URL = (month, year) => `http://localhost:8080/api/expenses/total-balance/${month}/${year}`

export const listExpensesRecord = () => axios.get(REST_API_BASE_URL);

export const createExpensesRecord = (expenses) => axios.post(REST_API_BASE_URL, expenses);

export const getTotalBalanceSum = () => axios.get(TOTAL_BALANCE_SUM_URL);

export const getTotalMonthlyExpenses = (month, year) => axios.get(TOTAL_BALANCE_SUM_BY_MONTH_URL(month, year));

export const updateExpensesRecord = (expensesId, expenses) => axios.put(REST_API_BASE_URL + "/" + expensesId, expenses);

export const getExpensesRecord = (expensesId) => axios.get(REST_API_BASE_URL + "/" + expensesId);

export const deleteExpensesRecord = (expensesId) => axios.delete(REST_API_BASE_URL + "/" + expensesId);

export const deleteAllExpensesRecords = () => axios.delete(`${REST_API_BASE_URL}/deleteAll`);