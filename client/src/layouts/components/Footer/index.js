import styles from './style.module.css'
import { Facebook, Instagram, Twitter  } from 'react-bootstrap-icons'
function Footer() {
    return ( 
        <> 
            <div style={{width: '100%', height: '50px'}}></div>
            <footer className = {styles.wrapper}>
                <div className = {styles.inner}>
                    <div className = {styles.action}>
                        <p className = {styles.license}>@2022 BKMotel</p>
                        <a href = '/' className = {styles.licenseContent}>Quy chế sử dụng</a>
                        <a href = '/' className = {styles.licenseContent}>Chính sách bảo mật</a>
                        <a href = '/' className = {styles.licenseContent}>Liên hệ</a>
                    </div>
                    <div className = {styles.socials}>
                        <a href = 'https://www.facebook.com' className = {styles.socialItem}>
                            <Facebook color="" size={20} />
                        </a>
                        <a href = 'https://www.instagram.com' className = {styles.socialItem}>
                            <Instagram color="" size={20} />
                        </a>

                        <a href = 'https://www.twitter.com' className = {styles.socialItem}>
                            <Twitter color="" size={20} />
                        </a>
                    </div>
                </div>
            </footer>    
        </>
    )
}


export default Footer;