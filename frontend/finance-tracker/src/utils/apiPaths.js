export const BASE_URL = "http://localhost:8000";

//API endpoint paths
//utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        LOGIN:"/api/v1/auth/login", // loginUser
        REGISTER:"/api/v1/auth/register",// registerUSer
        GET_USER_INFO:"/api/v1/auth/getUser",//getUserInfo in auth controlelr

    },
    DASHBOARD: {
        GET_DATA:"/api/v1/dashboard",//getdashboarddata in dboard controller

    },
    INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: '/api/v1/income/downloadexcel',

    },

    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_ALL_EXPENSE: "/api/v1/expense/get",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: '/api/v1/expense/downloadexcel',
        
    },
    IMAGE: { // under auth in backend
        UPLOAD_IMAGE:"/api/v1/auth/upload-image",

    },

};