import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {useNavigate} from 'react-router-dom'
import Input from '../../components/input/Input'
import { Link } from 'react-router-dom';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async(e) => {

  }

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

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

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