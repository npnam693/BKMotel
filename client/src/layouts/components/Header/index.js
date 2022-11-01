import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


import styles from './style.module.css'
import Search from '../Search'

import { List, PersonCircle , ClipboardPlus, BoxArrowInRight , Heart , Cloud, PencilSquare, BoxArrowLeft} from 'react-bootstrap-icons'



import Tippy from '@tippyjs/react/headless';


const userMenu = [
    {
        icon: <BoxArrowInRight size={24} style={{margin: "-4px 2px 0px -4px"}}/>,
        title: 'Đăng nhập',
        to: '/login',
    },
    {
        icon: <ClipboardPlus style={{marginTop: -4}}/>,
        title: 'Đăng ký',
        to: '/signup',
    },
];

const userActivedMenu = [
    {
        icon: <Heart />,
        title: 'Danh sách quan tâm',
        to: '/myfavourites',
    },
    {
        icon: <Cloud />,
        title: 'Bài đăng của tôi',
        to: '/myrooms',
    },
    {
        icon: <PencilSquare />,
        title: 'Đánh giá của tôi',
        to: '/myreviews',
    },
    {
        icon: <BoxArrowLeft size={24} style={{margin: "-4px 2px 0px -4px"}} />,
        title: 'Đăng xuất',
        to: '/logout',
    },
];

function Header() {
    var UserLogged = false;
    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("userInfo"));
        
        if (user) UserLogged = true;
    }, []);
    

    return (
        <>
            <div className = {styles.container}></div>
            <header className = {styles.wrapper}>
                <div className = {styles.inner}>
                    <a href = '/' className = {styles.logo}>
                        <span className = {styles.bklogo}>BK</span>
                        Motel
                    </a>
                    
                    <Search />

                    <div className = {styles.action}>
                        <a href = '/' className = {styles.uploadBtn}>ĐĂNG BÀI</a>
                    
                
                    <Tippy
                        render={attrs => (
                            <div className= {styles.menuWrapper} >  
                                <ul>
                                    {
                                        (UserLogged ?  userActivedMenu : userMenu).map((item, index) => {
                                            return (
                                                <li className={styles.menuActions}> 
                                                    {item.icon}
                                                    <a href={item.to} className={styles.menuItem}>
                                                        {item.title}
                                                    </a>    
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                        }
                        placement='bottom-end'
                        interactive

                    >
                        <button className = {styles.avatarOption}>
                            <List color="currentColor" size={18} />
                            <PersonCircle color="#A1A1A1" size={24} />
                        </button>                           
                    </Tippy>

                            
                    </div>  
                
                
                
                </div>
            </header>
        </>
    );
}

export default Header;