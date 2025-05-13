import React , {createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => { //It takes children as a prop, which means any component inside <UserProvider> ... </UserProvider> will be called children.
    const  [user, setUser] = useState (null);

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
    /*  This returns the UserContext.Provider which shares data (user, updateUser, clearUser) with all child components.
        value={{ ... }}: this is the actual data other components can access. */
}

export default UserProvider;