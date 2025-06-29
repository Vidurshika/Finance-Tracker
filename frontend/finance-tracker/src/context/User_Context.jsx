import React , {createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => { //It takes children as a prop, which means any component inside <UserProvider> ... </UserProvider> will be called children.
    const  [user, setUser] = useState (null);
    console.log(user);
    //function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    //function to clear user data (eg on logout)
    const clearUser = () => {
        setUser(null);//use this when the user logs out.
    };

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
    
}

export default UserProvider;