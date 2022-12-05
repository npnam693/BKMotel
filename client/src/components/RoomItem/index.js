import styles from './style.module.css'
import { Link } from 'react-router-dom';
import { StarFill, GeoAlt, Cash, House} from 'react-bootstrap-icons';
import Button from '@mui/material/Button';

import {memo} from 'react'
import { useSnackbar } from 'notistack';
import { UserState } from '../../Context/UserProvider';
import axiosClient from '../../api/axiosClient.js';

function RoomItem({ data }) {
    const { userInfo, userFavourites, setUserFavourites } = UserState()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const toast = (message, variantType) => {
        enqueueSnackbar(message, {
            variant: variantType,
            action: (key) => (
                <Button style={{ fontSize: '12px', fontWeight: '600' }} size='small' onClick={() => closeSnackbar(key)}>
                    Dismiss
                </Button>
            )
        });
    }
    const config = userInfo ? {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    } : {}
    const handleLikeClick = () => {
        axiosClient.put('/api/rooms/favourites/add', {
            roomId: data._id
        }, config)
            .then(response => {
                setUserFavourites(response.data.favourites)
                toast(response.data.message, 'success')
            })
            .catch(err => {
                toast(err.response.data.message, 'error')
            })
    }

    const formatNameAddress = (name) =>{
        if (name.substring(0, 9) === 'Thành phố') 
            return name.substring(10)
        if (name.substring(0, 4) === 'Tỉnh') 
            return name.substring(5)
        return name
    }

    return (
        <Link to = {`/detail/${data._id}`} className = {styles.wrapper}>
            <img className = {styles.img} src={data.image[0]}
                alt="Avatar" 
            />
            <div className={styles.content}>
                <div className = {styles.contentAction}>
                    <div className = {styles.likeWrapper}>
                        {userFavourites.some(userFavourite => userFavourite._id === data._id) ? (
                        <Button
                            variant="contained"
                            color='success'
                            sx={{
                                display: 'inline',
                                fontWeight: 'bold',
                                mx: 0.5,
                                fontSize: 14,
                                padding: '1px 10px',
                            }}
                            onClick={(e) =>{
                                e.preventDefault()
                                handleLikeClick()
                            }}
                        >
                            Đã yêu thích
                        </Button>): 
                        (<Button  
                            variant = "outlined" 
                            color = 'info'
                            sx = {{
                                display: 'inline',
                                fontWeight: 'bold',
                                mx: 0.5,
                                fontSize: 14,
                                padding: '1px 10px',
                                minWidth: '117px'
                            }}
                            onClick={(e) => {
                                e.preventDefault()
                                handleLikeClick()
                            }}
                        >
                            Yêu thích
                        </Button>)}
                        <p className = {styles.province} > {formatNameAddress(data.province)} </p>
                    </div>

                    <div className = {styles.rating}> 
                        <StarFill color="#00A699" size={10} style={{marginTop: -2}} />
                        <p className={styles.ratingPoint}>{(data.ratingPoint != null) ? data.ratingPoint.$numberDecimal : 0  }</p>
                    </div>
                </div>
                <div className = {styles.location}>
                    <GeoAlt color="#000000" size={18}  style={{marginTop: -3}}/>
                    <span className = {styles.locationContent}> {formatNameAddress(data.district)} </span>
                </div>
                <div className = {styles.cost}>
                    <Cash color="#000000" size={18} style={{marginTop: -4}}/>
                    <span className = {styles.costContent}>{data.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})} /tháng </span>
                </div>
                <div className = {styles.area}>
                    <House color="#000000" size={18} style={{marginTop: -4}}/>
                    <span className = {styles.areaContent}>{data.area}m2</span>
                </div>
            </div>
        </Link>
    );
}

export default memo(RoomItem);