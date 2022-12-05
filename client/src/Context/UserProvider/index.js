import React, { createContext, useContext, useState, useEffect} from "react";
import axiosClient from '../../api/axiosClient.js';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")))
    const [userFavourites, setUserFavourites] = useState([])
    

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"))
      setUserInfo(user)
      console.log('blo')
      if(user){
        const config = {
          headers: {
              Authorization: `Bearer ${user.token}`
          }
        }
        axiosClient.get(`/api/rooms/favourites/${user._id}`, config)
          .then(res => {
              // console.log(res)
              setUserFavourites(res.data)
          })
          .catch(err => {console.log(err)})
      }
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