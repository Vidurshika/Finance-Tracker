import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import ProfilePhotoSelector from '../../components/input/ProfilePhotoSelector'
import {useNavigate,Link } from 'react-router-dom'
import Input from '../../components/input/Input'
import { validateEmail } from '../../utils/helper';

const SignUp = () => {

  const [profilePic,setProfilePic] = useState(null);
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [error,setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) =>{
    e.preventDefault();
    let profileImageUrl ="";

    if(!fullName) {
      setError("Please enter your name");
      return;
    }
    if(!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if(!password) {
      setError("Please enter your password");
      return;
    }

    setError("");

    /* sign up api call */
  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-o flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs font-semibold text-blue-700 mt-[5px] mb-6'>
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
              type="text"
              value={fullName}
              onChange={({target})=> setFullName(target.value)}
              label="Full Name"
              placeholder="Enter name"
            />

            <Input 
              value={email}
              onChange={({target}) => setEmail(target.value)}
              label="Email Address"
              placeholder='Enter email address'
              type='text' 
            />
            <div className='md:col-span-2'> {/* like merging 2 cols */}
              <Input 
                value={password}
                onChange={({target}) => setPassword(target.value)}
                label="Password"
                placeholder='Enter password'
                type='password' 
              />
            </div>

          </div>

          {error && <p className='text-red-500 text-xs pb-2.5 font-semibold'>{error}</p>}
          
          <button className='btn-primary' type='submit'>
            Sign Up
          </button>

          <p className='text-[13px] text-black mt-3'>
            Already have an account? 😮{" "}
            <Link className="font-medium text-blue-800 underline" to="/login">
              Login
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp;