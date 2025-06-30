import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data'; //contains menu buttons info
import { UserContext } from '../../context/User_Context';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") { //If it’s the special "logout" route, call the handleLogout function.
      handleLogout();
      return;
    }
    navigate(route); //Otherwise, navigate to the clicked route path.
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className='fixed-sidebar w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-[200] overflow-auto'>
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>

        {user?.profileImageUrl ? ( // for testing -> if has an image show avatar , by taking this as the condition = !user?.profileImageUrl ?
          <img
            src={user.profileImageUrl}
            alt="User"
            className='w-20 h-20 bg-slate-400 rounded-full object-cover'
          /> // no img then show an Avatar
        ) : <CharAvatar fullName={user?.fullName} width="w-20" height="h-20" style="text-xl"/>}

        <h5 className='text-gray-950 font-medium leading-6'>
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (//Loops over each item in SIDE_MENU_DATA
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === item.label ? "text-white bg-blue-500" : "text-black"
          } py-3 px-6 rounded-lg mb-3`}
          //If activeMenu === item.label, that menu button gets special styling (text-white bg-primary), meaning it looks highlighted.
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}

    </div>
  );
};

export default SideMenu;
