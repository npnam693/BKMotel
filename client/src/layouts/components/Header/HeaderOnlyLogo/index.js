import styles from './style.module.css'
import { Link } from 'react-router-dom'
function HeaderOnlyLogo() {
    return (
        <>
            <div className = {styles.container}></div>
            <header className = {styles.wrapper}>
                <div className = {styles.inner}>
                    <Link to = '/' className = {styles.logo}>
                        <span className = {styles.bklogo}>BK</span>
                        Motel
                    </Link>
                </div>
            </header>
        </>
    );
}

export default HeaderOnlyLogo;