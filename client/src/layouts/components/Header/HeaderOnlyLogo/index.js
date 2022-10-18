import styles from './style.module.css'

function HeaderOnlyLogo() {
    return (
        <>
            <div className = {styles.container}></div>
            <header className = {styles.wrapper}>
                <div className = {styles.inner}>
                    <a href = '/' className = {styles.logo}>
                        <span className = {styles.bklogo}>BK</span>
                        Motel
                    </a>
                </div>
            </header>
        </>
    );
}

export default HeaderOnlyLogo;