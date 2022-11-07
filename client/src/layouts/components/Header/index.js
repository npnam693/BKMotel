import { Link, useNavigate } from 'react-router-dom';

import styles from './style.module.css'
import Search from '../Search'
import Menu from '../../../components/Menu'
import { UserState } from "../../../Context/UserProvider";
import { useState } from 'react';
import {Modal, Button, createTheme} from '@mui/material';

const theme1 = createTheme({
    components: {
    // Name of the component
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',fontSize: '15px',fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,height: '50px',width: '400px',color: '#1488DB', marginBottom:'30px'
                },
            }
        },
},
});

function Header() {
    const { userInfo } = UserState();
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false);
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
                            {!userInfo ? 
                                <Link  onClick={() => setModalOpen(true)} className = {styles.uploadBtn}>ĐĂNG BÀI</Link>
                                :
                                <Link  to='/upload' className = {styles.uploadBtn}>ĐĂNG BÀI</Link>
                            }
                            
                            <Menu/>        
                    </div>  
                    
                    <Modal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className={styles.modalUpload}>
                            <p className={styles.modalUploadContent}> Để đăng tải bài mới, hãy đăng nhập trước.</p>
                            <Link to='/login' className = {styles.loginBtn} style={{marginRight:0}}>ĐĂNG NHẬP</Link>
                            
                            <p className={styles.modalUploadContent}> Bạn chưa có tài khoản ? </p>
                            
                            <Button 
                                theme={theme1} 
                                className = {styles.logInBTN} 
                                variant="outlined"  
                                size='small' 
                                onClick = { () => navigate('/signup') }
                            >
                                
                                ĐĂNG KÝ TÀI KHOẢN NGAY
                            </Button>
                        </div>
                    </Modal>
                </div>
            </header>
        </>
    );
}

export default Header;