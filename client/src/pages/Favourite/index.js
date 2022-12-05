import styles from './style.module.css'
import FavouriteItem from '../../components/FavouriteItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, CircularProgress, Divider, Modal} from '@mui/material'
import { useSnackbar } from 'notistack';
import { UserState } from '../../Context/UserProvider'
import { useCallback, useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient.js';


const theme = createTheme({
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '15px',
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
                    width: '100%',
                    marginBottom: '30px',
                    marginTop: '30px'
                }
            }
        }
    },
    palette: {
        bkmotel: {
            main: '#00A699',
        },
        defaultBtn: {
            main: '#ccc'
        }
    },
});


function FavouritePage() {
    const {userInfo, userFavourites, setUserFavourites}  = UserState()
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [modalOpen, setModalOpen] = useState(false)
    const toast = (message, variantType) => {
        enqueueSnackbar(message, {
            variant: variantType,
            action: (key) => (
                <Button style={{ fontSize: '12px', fontWeight: '600' }} size='small' onClick={() => closeSnackbar(key)}>
                    Dismiss
                </Button>
            )
        });
    };
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const handleClear = ()=>{
        setLoading(true)
        axiosClient.put('/api/rooms/favourites/clear',{},config)
            .then(res => {
                setUserFavourites(res.data.favourites)
                toast(res.data.message, 'success')
                setLoading(false)
            })
            .catch(error => {
                toast(error.response.data.message, 'error')
                setLoading(false)
            })
    }

    const handleRemove = useCallback((id)=>{
        setLoading(true)
        axiosClient.put('/api/rooms/favourites/add', {
            roomId: id
        }, config)
            .then(response=>{
                setUserFavourites(response.data.favourites)
                toast(response.data.message, 'success')
                setLoading(false)
            })
            .catch(err=>{
                toast(err.response.data.message, 'error')
                setLoading(false)
            })
    }, [])

    useEffect(()=>{
        setLoading(true)
        axiosClient.get(`/api/rooms/favourites/${userInfo._id}`, config)
            .then(res => {
                // console.log(res)
                setUserFavourites(res.data)
                setLoading(false)
            })
            .catch(err => {
                toast(err.response.data.message, 'error')
                setLoading(false)
            })
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.inner}>
                <div className={styles.heading}>
                    <div className={styles.header}>Danh sách quan tâm</div>
                    <Button 
                        variant="contained"
                        size='large'
                        color='bkmotel'
                        onClick={() =>{
                            if (userFavourites.length)
                                    setModalOpen(true)
                            }
                        }
                    >
                        Xóa tất cả
                    </Button>
                    <Modal
                        open={modalOpen}
                        onClose={()=>setModalOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className={styles.modal}>
                            <header id="modal-modal-title"  className={styles.modalHeader}>
                                Xác nhận xóa
                            </header>
                            <p id='modal-modal-description' className={styles.modalMessage}>Bạn có chắc chắn muốn xóa ?</p>
                            <div className={styles.modalFooter}>
                                <Button
                                    variant="contained"
                                    size='small'
                                    color='bkmotel'
                                    onClick={() => {
                                        handleClear()
                                        setModalOpen(false)
                                    }}
                                >
                                    Xác nhận
                                </Button>
                                <Button
                                    variant="contained"
                                    size='small'
                                    color='info'
                                    onClick={() => setModalOpen(false)}
                                >
                                    Hủy xóa
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </div>
                <Divider variant="middle"  />
                {loading ? (<CircularProgress size={100}/>) : (
                    <div className={styles.listItem}>
                        {!userFavourites.length ? (<span style={{ fontSize: '20px' }}>Danh sách trống</span>) : (userFavourites.map(room => <FavouriteItem key={room._id} data ={room} onRemove={handleRemove}/>))}
                    </div>
                )}
            </div> 
        </ThemeProvider>
    );
}

export default FavouritePage;