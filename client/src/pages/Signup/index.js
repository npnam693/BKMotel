import axios from "axios";
import { useState } from "react";

import HeaderOnlyLogo from "../../layouts/components/Header/HeaderOnlyLogo";
import Footer from "../../layouts/components/Footer";
import styles from './style.module.css'

import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { createTheme, ThemeProvider  } from '@mui/material/styles';

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



const handleSubmit = async ({email, password, confirmPassword, name, phoneNumber}) => {
    var avatar= 'alo'
    if (!email || !password) {
      return;
    }

    // console.log(email, password);
    try {
      const { data } = await axios.post(
        "/api/users",
        { name, email, password, avatar, phoneNumber  },
      );

      // console.log(JSON.stringify(data));
      
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {    
        console.log("error")
    }
};



function LoginPage({children}) {
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '', 
        phoneNumber: '',
    })
    console.log(values)
    return ( 
        <>
            <HeaderOnlyLogo />
        
            <div className={styles.inner}>
            <p style = {{fontSize:16, color:'black', marginBottom:15}}>Chào mừng bạn đến với  
                <span style = {{fontSize:16, color:'#1488DB', fontWeight:500}}> BK</span>
                <span style = {{fontSize:16, color:'#00A699'}}>Motel</span>
            .</p>

            <p style = {{fontSize:20, fontWeight: 500, marginBottom: 15}}>Đăng ký tài khoản mới</p>
            
            <Divider variant="middle" theme = {theme}/>
            <ThemeProvider theme={theme}>
                
                <TextField 
                    name="email" 
                    label="Nhập Email / Tên đăng nhập" 
                    fullWidth color='bkmotel' 
                    onChange = {(e) => setValues({...values, [e.target.name]: e.target.value})}
                    shrink  
                />
                
                <div className = {styles.passworkWrapper}>
            
                    <TextField 
                        name = "password"
                        label="Nhập mật khẩu" 
                        type="password" 
                        variant="outlined"  
                        color='bkmotel' 
                        style = {{width: 230}}
                        onChange = {(e) => setValues({...values, [e.target.name]: e.target.value})}  
                    />
                
                    <TextField 
                        name = "confirmPassword" 
                        label="Xác nhận mật khẩu" 
                        type="password" 
                        variant="outlined"  
                        color='bkmotel' 
                        style = {{width: 230}}
                        onChange = {(e) => setValues({...values, [e.target.name]: e.target.value})}
                    />

                </div>
                
                <Divider variant="middle" theme = {theme}/>
                
                <TextField 
                    name = "name" 
                    label="Họ và tên" 
                    variant="outlined"  
                    color='bkmotel' 
                    fullWidth 
                    onChange = {(e) => setValues({...values, [e.target.name]: e.target.value})}
                />

                <TextField 
                    name="phoneNumber" 
                    label="Số điện thoại" 
                    variant="outlined"  
                    color='bkmotel' 
                    fullWidth
                    onChange = {(e) => setValues({...values, [e.target.name]: e.target.value})}
                />

            <Button 
                style= {{marginLeft: 'auto', marginTop: 10, width: 120}} 
                variant="contained" 
                size='large' 
                color='bkmotel'
                onClick = { 
                    () => handleSubmit(values)
                }
            >ĐĂNG KÝ

            </Button>

            </ThemeProvider>

        
        </div>

        
        <Footer />
        
        </>


       

    );
}

export default LoginPage;