import React, { createContext, useContext} from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const userInfo = () => JSON.parse(localStorage.getItem("userInfo"))

    return (
      <UserContext.Provider
        value={{
            userInfo,
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