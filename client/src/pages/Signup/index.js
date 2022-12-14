import axiosClient from '../../api/axiosClient.js';
import { useState, Fragment, useCallback } from "react";
import { useNavigate } from 'react-router-dom'


import HeaderOnlyLogo from "../../layouts/components/Header/HeaderOnlyLogo";
import Footer from "../../layouts/components/Footer";
import styles from './style.module.css'
import {UserState} from '../../Context/UserProvider'


import { Divider, TextField, Button, CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { useSnackbar } from 'notistack';

import { ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";



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

const snackbarMessage = {
    lackInfo: {
        variant: 'warning',
        message: "B???n ph???i ??i???n ?????y ????? c??c th??ng tin c???n thi???t."
    },
    wrongConfirmPass: {
        variant: 'error', 
        message: 'M???t kh???u v?? m???t kh???u x??c th???c kh??ng gi???ng nhau'
    },
    notImg: {
        variant: 'error', 
        message: '???nh ?????i di???n t???i l??n ph???i l?? m???t file ???nh.'
    },
    connectFail: {
        variant: 'error', 
        message: 'Kh??ng k???t n???i ???????c ?????n server.'
    },

}



function SignUpPage({children}) {
    const { setUserInfo } = UserState();

    let navigate = useNavigate()
    const [isUpload, setUpload] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '', 
        phoneNumber: '',
        avatar: '',
    })
    
    function uploadFile(imageUpload, progessRef) {
        setUpload(true)
        if (imageUpload == null) return;
        if (imageUpload.type !== "image/jpeg" && imageUpload.type !== "image/png" && imageUpload.type !== "image/webp") {
            showSnackbar('notImg')
            setUpload(false)
            return
        }

        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setValues({...values, 'avatar': url})
                setUpload(false)
            });
        });
    };

    const handleSubmit = async ({email, password, confirmPassword, name, phoneNumber, avatar}) => {
        console.log(email, password, confirmPassword, name, phoneNumber, avatar)

        if (!email || !password || !name || !phoneNumber  || avatar === '') {
            showSnackbar('lackInfo')
            return
        }

        if (confirmPassword !== password) {
            showSnackbar('wrongConfirmPass')
            return
        }
        
        try {
          const { data } = await axiosClient.post(
            "/api/users",
            { name, email, password, avatar, phoneNumber},
          );

            localStorage.setItem("userInfo", JSON.stringify(data));
            setUserInfo(JSON.parse(localStorage.getItem("userInfo")))
          navigate('/')
        } catch (error) {    
            showSnackbarMessage(error.response.data.message)
        }
    };
    
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const showSnackbar = useCallback((detail) => {
        enqueueSnackbar(snackbarMessage[detail].message, {
            variant: snackbarMessage[detail].variant,
            action: (key) => (
                <Fragment>
                    <Button style={{fontSize: '12px', fontWeight: '600'}} size='small' onClick={() => closeSnackbar(key)}>
                        Dismiss
                    </Button>
                </Fragment>
            )
        });
    }, [enqueueSnackbar, closeSnackbar]);


    const showSnackbarMessage = useCallback((message) => {
        enqueueSnackbar(message, {
            variant: 'warning',
            action: (key) => (
                <Fragment>
                    <Button style={{fontSize: '12px', fontWeight: '600'}} size='small' onClick={() => closeSnackbar(key)}>
                        Dismiss
                    </Button>
                </Fragment>
            )
        });
    }, [enqueueSnackbar, closeSnackbar]);


    return ( 
        <>
            <HeaderOnlyLogo />
        
            <div className={styles.inner}>
            <p style = {{fontSize:16, color:'black', marginBottom:15}}>Ch??o m???ng b???n ?????n v???i  
                <span style = {{fontSize:16, color:'#1488DB', fontWeight:500}}> BK</span>
                <span style = {{fontSize:16, color:'#00A699'}}>Motel</span>
            .</p>

            <p style = {{fontSize:20, fontWeight: 500, marginBottom: 15}}>????ng k?? t??i kho???n m???i</p>
            
            <Divider variant="middle" theme = {theme}/>
            <ThemeProvider theme={theme}>
                
                <TextField 
                    name="email" 
                    label="Nh???p Email / T??n ????ng nh???p" 
                    fullWidth color='bkmotel' 
                    onChange = {(e) => setValues({...values, [e.target.name]: e.target.value})}
                    shrink  
                />
                
                <div className = {styles.passworkWrapper}>
            
                    <TextField 
                        name = "password"
                        label="Nh???p m???t kh???u" 
                        type="password" 
                        variant="outlined"  
                        color='bkmotel' 
                        style = {{width: 230}}
                        onChange = {(e) => setValues({...values, [e.target.name]: e.target.value})}  
                    />
                
                    <TextField 
                        name = "confirmPassword" 
                        label="X??c nh???n m???t kh???u" 
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
                    label="H??? v?? t??n" 
                    variant="outlined"  
                    color='bkmotel' 
                    fullWidth 
                    onChange = {(e) => setValues({...values, [e.target.name]: e.target.value})}
                />

                <TextField 
                    name="phoneNumber" 
                    label="S??? ??i???n tho???i" 
                    variant="outlined"  
                    color='bkmotel' 
                    fullWidth
                    onChange = {(e) => setValues({...values, [e.target.name]: e.target.value})}
                />
            
            <div className = {styles.fileArea}>
                <label for="images">???nh ?????i di???n</label>
                <input 
                    className={styles.inputFile} 
                    type="file" 
                    name="images" 
                    id="images" 
                    required="required" 
                    multiple="multiple"
                    onChange={(e) =>  uploadFile(e.target.files[0])}
                />
                <div className={styles.fileDummy}>
                    <div className={styles.fileSuccess}>???nh ?????i di???n ???? ???????c ch???n</div>
                    <div className={styles.fileDefault}>Click ????? ch???n ???nh ?????i di???n c???a b???n</div>
                    {isUpload ? 
                        <div>
                        <CircularProgress className={styles.iconProgess} /> 
                        </div> : null}
                </div>
            </div>

            <Button 
                style= {{marginLeft: 'auto', marginTop: 10, width: 120}} 
                variant="contained" 
                size='large' 
                color='bkmotel'
                onClick = { () => {
                    handleSubmit(values)
                }}
            >????NG K??
            </Button>

            </ThemeProvider>
        </div>
        
        <Footer />
        
        </>
    );
}

export default SignUpPage;