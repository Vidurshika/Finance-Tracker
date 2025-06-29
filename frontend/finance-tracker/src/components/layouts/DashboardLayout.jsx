import React, { useContext } from 'react'
import { UserContext } from "../../context/User_Context"
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ( {children, activeMenu} ) => {
    const {user} = useContext(UserContext);
    
  return (
    <div className=''>
        <Navbar activeMenu={activeMenu} />

        {user && (
            <div className='flex'>
                <div className='max-[1023px]:hidden'>{/*sidebar appearing starts from 1024 */}
                    <SideMenu activeMenu={activeMenu}/>
                </div>

                <div className='flex-1 px-5 w-full lg:ml-64'> {children} </div>
            </div>
         )} 
    </div>
  )
}

export default DashboardLayout;