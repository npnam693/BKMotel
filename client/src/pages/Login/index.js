import axiosClient from '../../api/axiosClient.js';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import HeaderOnlyLogo from "../../layouts/components/Header/HeaderOnlyLogo";
import Footer from "../../layouts/components/Footer";
import styles from './style.module.css'

import { createTheme, ThemeProvider  } from '@mui/material/styles';
import {FormControlLabel, Checkbox, Divider, TextField, Button, Link} from '@mui/material'
import {UserState} from '../../Context/UserProvider'

function LoginPage({children}) {
    const { userInfo, setUserInfo , setUserFavourites} = UserState();
    let navigate = useNavigate();
    
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const toast = (message, variantType) => {
        enqueueSnackbar(message, {
            variant: variantType,
            action: (key) => (
                <Button style={{fontSize: '12px', fontWeight: '600'}} size='small' onClick={() => closeSnackbar(key)}>
                    Dismiss
                </Button>
            )
        });
    };

    const handleSubmit = async ({email, password}) => {
        if (!email || !password) {
            toast('Bạn phải điền đầy đủ các thông tin cần thiết.', 'warning')
            return
        }
        try {
            const { data } = await axiosClient.post(
                "/api/users/login",
                { email, password },
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
            const user = JSON.parse(localStorage.getItem("userInfo"))
            setUserInfo(user)
            setUserFavourites(user.favourites)
            toast('Đăng nhập thành công.', 'success')
            navigate('/')
        }  catch (error) {    
            if (error.response.status === 500) 
                toast('Không kết nối được đến server.', 'error')
            else 
                toast('Email hoặc mật khẩu không hợp lệ.', 'error')    
        }
    };

    const [values, setValues] = useState({
        email: "",
        password: "",
    })
    return ( 
        <>
            <HeaderOnlyLogo />
        
            <div className={styles.inner}>
            <p style = {{fontSize:16, color:'black', marginBottom:15}}>Chào mừng bạn đến với  
                <span style = {{fontSize:16, color:'#1488DB', fontWeight:500}}> BK</span>
                <span style = {{fontSize:16, color:'#00A699'}}>Motel</span>
            .</p>

            <p style = {{fontSize:20, fontWeight: 500, marginBottom: 15}}>Đăng nhập để tiếp tục</p>
            
            <Divider variant="middle" theme = {theme}/>
            <ThemeProvider theme={theme}>
            
            
                <TextField 
                    name = "email"
                    label="Nhập Email / Tên đăng nhập" 
                    fullWidth 
                    color='bkmotel' 
                    onChange = { e => {
                        setValues({...values, [e.target.name]: e.target.value})
                    }}    
                />
                <TextField 
                    name = "password"
                    label="Nhập mật khẩu" 
                    type="password" 
                    variant="outlined" 
                    fullWidth 
                    color='bkmotel' 
                    onChange = { e => {
                        setValues({...values, [e.target.name]: e.target.value})
                    }}    
                />
        
                <div className = {styles.loginActionContainer}>
                    <div className = {styles.loginAction}>
                        <Link to="/resetpassword" underline="none" color='#00A699'>Quên mật khẩu ?</Link>
                        
                        <FormControlLabel 
                            control={<Checkbox defaultChecked color='bkmotel' sx={{ '& .MuiSvgIcon-root': { fontSize: 22 }}}/> } 
                            label= 'Nhớ tài khoản'
                        />
                    </div>

                    <Button 
                        type = 'submit'
                        variant="contained" 
                        size='large' 
                        color='bkmotel'
                        onClick={(e) => {handleSubmit(values)}}
                    >
                        ĐĂNG NHẬP
                    </Button>
                </div>
            <Divider variant="middle" theme = {theme}/>

            <p style = {{fontSize:20, fontWeight: 500, marginBottom: 20, marginTop: 30}}>Bạn chưa có tài khoản ?</p>
            </ThemeProvider>
            <Button 
                theme={theme1} 
                className = {styles.logInBTN} 
                variant="outlined"  
                size='large' 
                onClick = { () => navigate('/signup') }
            >
                ĐĂNG KÝ TÀI KHOẢN
            </Button>
            
        </div>

        
        <Footer />
        
        </>


       

    );
}

const theme = createTheme({
    components: {
        // Name of the component
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 600,
                        height: '42px',
                        color: "white"
                    },
                }
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        width: '480px',
                        marginBottom: '30px'
                    }
                }
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        marginBottom: '20px',
                        fontSize: '30px',
                    }
                }
            },

            MuiFormControlLabel: {
                styleOverrides: {
                    label: {
                        fontSize: '16px',
                        fontFamily: "'Josefin Sans', sans-serif",
                    }
                }
            },
            MuiInputLabel: {
                defaultProps: {
                  sx: {
                    fontSize: "16px",
                    fontFamily: "'Josefin Sans', sans-serif",

                  },
                },
              },
            MuiOutlinedInput: {
                defaultProps: {
                  sx: {
                    fontSize: "16px",
                    fontFamily: "'Josefin Sans', sans-serif",
                  }
                }
              }
            },
    palette: {
      bkmotel: {
        main: '#00A699',
      },
    },
  });

const theme1 = createTheme({
    components: {
    // Name of the component
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',fontSize: '15px',fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,height: '50px',width: '400px',color: '#1488DB',
                },
            }
        },
},
});

export default LoginPage;