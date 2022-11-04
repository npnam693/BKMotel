import React, { createContext, useContext, useState, useEffect} from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState()
    
    useEffect(() => {
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")))
    }, [])

    return (
      <UserContext.Provider
        value={{
            userInfo,
            setUserInfo,
            // userFavourite,
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