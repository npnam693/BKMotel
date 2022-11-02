import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import styles from './style.module.css'
import Search from '../Search'

import Menu from '../../../components/Menu'
import { UserState } from "../../../Context/UserProvider";


function Header() {
    const { userInfo } = UserState();
    var curentUserInfo = userInfo()

    
    return (
        <>
            <div className = {styles.container}></div>
            <header className = {styles.wrapper}>
                <div className = {styles.inner}>
                    <Link to = '/' className = {styles.logo}>
                        <span className = {styles.bklogo}>BK</span>
                        Motel
                    </Link>
                    <Search />
                    <div className = {styles.action}>
                        <Link to = '/' className = {styles.uploadBtn}>ĐĂNG BÀI</Link>
                        <Menu  userInfo = {curentUserInfo}/>        
                    </div>  
                </div>
            </header>
        </>
    );
}

export default Header;