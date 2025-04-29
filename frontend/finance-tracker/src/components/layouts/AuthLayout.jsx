import React from 'react'
import bar from "../../assets/images/bar.png"
import { FiBarChart2 } from 'react-icons/fi';

const AuthLayout = ({ children }) => { /* children is a special prop in React.It refers to whatever JSX you wrap inside this component when you use it. */
  return (
    <div className='flex'>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Finance Tracker</h2>
        {children}
      </div>
      {/* hidden: Hides the element on all screen sizes by default
          md:block: Shows the element only when the screen width is 768px or wider (i.e., medium screens and up) */}
      <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
        <div className='w-48 h-48 rounded-[40px] bg-blue-600 absolute -top-5 -left-5' />
        <div className='w-48 h-56 rounded-[40px] border-[20px] border-blue-400 absolute top-[30%] -right-10' />
        <div className='w-48 h-48 rounded-[40px] bg-blue-500 absolute -bottom-7 -left-5' />
        
        <div className='grid grid-cols-1 z-20'> {/* this div is for a rectangle in this box, called seperately */}
           <StatsInfoCard 
                icon={<FiBarChart2 />}
                label="Track Your Income and Expense"
                value="500,000"
                color="bg-blue-500"
            />
        </div>

        <img src={bar} alt="" className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-300/15' />
      </div>
    </div>
  )
}

export default AuthLayout;

const StatsInfoCard = ({ icon, label, color, value }) => {
    return (
      <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-blue-400/10 border border-gray-200/50 z-10'>
        <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
          {icon}
        </div>
        <div>
          <h6 className='text-xs text-gray-500 mb-1'>{label}</h6>
          <span className='text-[20px]'>${value}</span>
        </div>
      </div>
    );
  };
  