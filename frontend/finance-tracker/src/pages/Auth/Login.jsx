import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {useNavigate,Link } from 'react-router-dom'
import Input from '../../components/input/Input'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter the password");
      return;
    }
    setError("");

    //login api call
    try { 
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { //sends a POST request to the login API.To the given URL as the endpoint
        email,   // these 2 are included as the req.body
        password, // plain pw is sent but would be hashed and checked by comparePassword (in model) at the controller
      }); //{ email, password } is the data sent to the backend, taken from the form the user filled.
      const { token, user} = response.data;// response received from above line, extracts token and user from the response.data object.

      if( token){
        localStorage.setItem("token", token);  /*  This stores the token in the browser's localStorage.
                                           It allows the frontend to remember the user is logged in."token" is the key.token is the value received from backend. */
        updateUser(user);/* Updating the user state globally(in front) using updateUser(user), so:
                            The rest of your app (like Navbar, Dashboard, etc.) knows the user is logged in.
                            You can access user info (like name, role, email) from anywhere using useContext(UserContext). */                     
        navigate("/dashboard");// redirect to Home component after login
      }
    } catch(error){
      if(error.response && error.response.data.message){ // catch catches an error object -> { ... , response:{ data:{message:}, .. , ..},..,..}
        setError(error.response.data.message); // store error sent by backend in here , given by res.data (message)
      } else {
        setError("Something went wrong.Please try again.");
      }
    }
  }
/* response.data from backend:-
{
    id: "6097e0c...",       // the user's MongoDB ID
    user: {                 // full user object (excluding password)
      _id: "6097e0c...",
      name: "Vivi",
      email: "vivi@email.com",
      ... // other user fields
    },
    token: "eyJhbGciOi..."  // JWT token string
} 
*/

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center mt-10 md:mt-5'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back,Your dashboard awaits!</h3>
        <p className='text-xs font-semibold text-black mt-[5px] mb-6'>
          Please enter your details to log in 
        </p>
        <form onSubmit={handleLogin}>
          <Input 
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder='Enter email address'
            type='text' 
          />
          <Input 
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder='Enter password'
            type='password' 
          />

          {error && <p className='text-red-500 text-xs pb-2.5 font-semibold'>{error}</p>}

          <button className='btn-primary' type='submit'>
            Login
          </button>

          <p className='text-[13px] text-black mt-3'>
            Don’t have an account? 🤔{" "}
            <Link className="font-medium text-blue-800 underline" to="/signup">
              Sign Up
            </Link>
          </p>


        </form>
      </div>
    </AuthLayout>
  )
}

export default Login