import axios from "axios";
import { BASE_URL } from "./apiPaths";  //http://localhost:8000

const axiosInstance = axios.create({  //Makes a custom axios object (axiosInstance) 
    baseURL: BASE_URL,  //baseURL: This will be added in front of every request URL
    timeout: 10000,     //If the server doesn’t respond in 10 seconds (10000ms), cancel the request.
    headers: {          //Headers: Tell the server we’re sending and expecting JSON.
        "Content-Type": "application/json",
        Accept: "application/json", 
    },
});

// Request interceptor

/* An interceptor is like a "middle person" that sits between your frontend and the server.
It can watch, change, or stop the request before it is sent.
It can also handle, change, or respond to the response before it reaches your code. */

//Interceptor for ALL outgoing requests
axiosInstance.interceptors.request.use(  //interceptors.request.use(...): This runs before every request is sent.
    (config) => {
        const accessToken = localStorage.getItem("token"); //Reads your saved login token from the browser.
        if (accessToken) {//If token exists, it adds a Bearer token to the header so backend knows you're logged in.
            config.headers.Authorization = `Bearer ${accessToken}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
/* 1. User logs in via frontend form.→ You send login info (like email & password) to the backend.
2. Backend verifies the info.→ If it's correct, the backend responds with a token (usually a JWT).
3. Frontend receives the token.→ Then it does something like:localStorage.setItem("token", res.data.token);
4. Now the token is saved in localStorage.
*/

// Interceptor for ALL incoming responses
axiosInstance.interceptors.response.use( //This runs after every response.
    (response) => {
        return response;//response back to your React component (frontend)
    },
    (error) => {
        // handle common errors globally
        if (error.response) {
            if (error.response.status === 401) {
                // redirect to login page
                window.location.href = "/login"; // navigate to another page , url changed
            } else if (error.response.status === 500) {
                console.error("Server error. Please try again");
            }
        } else if (error.code === "ECONNABORTED") { //ECONNABORTED: Server didn’t respond in time → show timeout message.
            console.error("Request timeout. Please try again");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
