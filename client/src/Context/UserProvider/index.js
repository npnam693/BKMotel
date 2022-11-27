import React, { createContext, useContext, useState, useEffect} from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState()
    const [userFavourites, setUserFavourites] = useState([])
    
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"))
      setUserInfo(user)
      if(user) setUserFavourites(user.favourites)
    }, [])

    return (
      <UserContext.Provider
        value={{
            userInfo,
            setUserInfo,
            userFavourites, 
            setUserFavourites,
        }}
      >
        {children}
      </UserContext.Provider>
    );
};

export const UserState = () => {
    return useContext(UserContext);
};

export default UserProvider;