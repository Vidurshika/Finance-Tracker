import React from 'react'
import './index.css'
import { BrowserRouter,Routes,Route ,Navigate} from "react-router-dom";
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import UserProvider, { UserContext } from './context/User_Context';

const App = () => {
  return (
    <UserProvider>
      <div> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />} /> {/* execute the root func below */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  )
}

export default App;

/* You will never stay on / — it immediately redirects you to either /login or /dashboard. */
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token"); //JWT token, created by the backend (server) after you log in successfully.
  /*  It checks if a token exists in localStorage. That token would normally be set when a user logs in.
      If the token exists (isAuthenticated === true), the user is redirected to the dashboard (/dashboard).
      If not, they are sent to the login page (/login).
      This is a simple auth redirect mechanism. */
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

/*  How it all works together:
User logs in → server gives a token.
Frontend stores that token in localStorage.
Later, you check if the token exists
If it exists → user is logged in → show dashboard.
If not → redirect to login. */
