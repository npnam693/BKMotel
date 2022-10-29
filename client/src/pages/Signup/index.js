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

  

function LoginPage({children}) {
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
                
                <TextField id="outlined-basic" label="Nhập Email / Tên đăng nhập" fullWidth color='bkmotel' shrink  />
                
                <div className = {styles.passworkWrapper}>
            
                    <TextField id="outlined-basic" label="Nhập mật khẩu" type="password" variant="outlined"  color='bkmotel' style = {{width: 230}}  />
                
                    <TextField id="outlined-basic" label="Xác nhận mật khẩu" type="password" variant="outlined"  color='bkmotel' style = {{width: 230}} />

                </div>
                
                <Divider variant="middle" theme = {theme}/>
                
                <TextField id="outlined-basic" label="Họ và tên" variant="outlined"  color='bkmotel' fullWidth />

                <TextField id="outlined-basic" label="Số điện thoại" variant="outlined"  color='bkmotel' fullWidth />



                <Button style= {{marginLeft: 'auto', marginTop: 10, width: 120}} variant="contained" size='large' color='bkmotel'>ĐĂNG KÝ</Button>


            </ThemeProvider>

        
        </div>

        
        <Footer />
        
        </>


       

    );
}

export default LoginPage;