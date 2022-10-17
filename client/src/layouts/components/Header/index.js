import styles from './style.module.css'
import Search from '../Search'
function Header() {
    return (
        <>
            <div className = {styles.container}></div>
            <header className = {styles.wrapper}>
                <div className = {styles.inner}>
                    <a href = '/' className = {styles.logo}>BKMotel</a>
                    
                    <Search />

                    <div className = {styles.action}>
                        <a href = '/' className = {styles.uploadBtn}>ĐĂNG BÀI</a>
                        
                        <button className = {styles.avatarOption}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#A1A1A1" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                        </button>     
                    </div>  
                </div>
            </header>
        </>
    );
}

export default Header;