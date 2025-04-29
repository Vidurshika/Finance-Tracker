import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'

const Login = () => {
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back,Your dashboard awaits!</h3>
        <p className='text-xs font-semibold text-black mt-[5px] mb-6'>
          Please enter your details log in 
        </p>
      </div>
    </AuthLayout>
  )
}

export default Login