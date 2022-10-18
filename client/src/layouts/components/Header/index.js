import styles from './style.module.css'
import Search from '../Search'

import { List, PersonCircle  } from 'react-bootstrap-icons'

function Header() {
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
                        
                        <button className = {styles.avatarOption}>
                            <List color="currentColor" size={18} />
                            <PersonCircle color="#A1A1A1" size={24} />
                        </button>     
                    </div>  
                </div>
            </header>
        </>
    );
}

export default Header;