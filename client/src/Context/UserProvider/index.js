import React, { createContext, useContext, useEffect, useState } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")))

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUserInfo(userInfo);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return (
      <UserContext.Provider
        value={{
            userInfo,
            setUserInfo,
            // userReview,
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