import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/expenses";

const TOTAL_BALANCE_SUM_URL = "http://localhost:8080/api/expenses/total-balance";

const TOTAL_BALANCE_SUM_BY_MONTH_URL = (month, year) => `http://localhost:8080/api/expenses/total-balance/${month}/${year}`

export const listExpensesRecord = () => 
    axios.get(REST_API_BASE_URL, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });

export const createExpensesRecord = (expenses) => 
    axios.post(REST_API_BASE_URL, expenses, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });

export const getTotalBalanceSum = () => 
    axios.get(TOTAL_BALANCE_SUM_URL, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });

export const getTotalMonthlyExpenses = (month, year) => axios.get(TOTAL_BALANCE_SUM_BY_MONTH_URL(month, year), {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const updateExpensesRecord = (expensesId, expenses) => axios.put(`${REST_API_BASE_URL}/${expensesId}`, expenses, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const getExpensesRecord = (expensesId) => axios.get(`${REST_API_BASE_URL}/${expensesId}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const deleteExpensesRecord = (expensesId) => axios.delete(`${REST_API_BASE_URL}/${expensesId}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export const deleteAllExpensesRecords = () => axios.delete(`${REST_API_BASE_URL}/deleteAll`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});