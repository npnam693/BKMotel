import edit from './edit.module.css'
import { StarFill, Star } from 'react-bootstrap-icons';
import { Rating, Button  } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient.js';
import { reviewID } from './Myreview';
import {USER} from '../../pages/MyReview/index.js'
import { useSnackbar } from 'notistack';

const EditReview = ()=>{
     //chua hien review de edit
    const [reload, setReload] = useState(false)
    const [review, setReview] = useState({
        ratingPoint: reviewID.ratingPoint,
        description: reviewID.description,
    });
    const {enqueueSnackbar, closeSnackbar } = useSnackbar();
    const config = USER ? {
        headers: {
            Authorization: `Bearer ${USER.token}`
        }
    } : {}

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
    
    const updateReview =async review =>{
        try {
            axiosClient.put(`/api/reviews/updatereview/${reviewID._id}`, review,config)
                .then(res => {
                    axiosClient.put('/api/rooms/editrooms/reviews',{
                        roomId: reviewID.room._id,
                        ratingPoint: 
                        Math.round(((reviewID.room.ratingCount * parseFloat(reviewID.room.ratingPoint.$numberDecimal)) - reviewID.ratingPoint + review.ratingPoint)/(reviewID.room.ratingCount) * 10)/10,
                        ratingCount: reviewID.room.ratingCount
                    }, config)
                        .then(response => {
                            toast('Chỉnh sửa đánh giá thành công', 'success')
                            setReload(!reload)
                        })
                        .catch(err => {
                            toast('Chỉnh sửa đánh giá thất bại', 'error')
                        })

                })
                .catch(err => console.log(err))
        } catch (error) {
            return error
        }
     }

     

    return (
        <>
        <div className={edit.title} >Chỉnh sửa đánh giá</div>
      
        <div className={edit.reviewContainer}>
        
           
            <div className = {edit.userIntro}>
            <img className = {edit.img} src={reviewID.room.image[0]} 
                    alt="Avatar" 
                />
                <p className= {edit.address}>{reviewID.room.district},{reviewID.room.province}</p>  
                <p className= {edit.name}>{reviewID.room.title}</p>
            </div>
            <div className = {edit.rating}>
                                <Rating 
                                    icon={<StarFill size={60} style={{marginRight: 5}}/>} 
                                    emptyIcon={<Star size={60} style={{marginRight: 5}}/>} 
                                    sx={{color: "#00A699"}}
                                    value={review.ratingPoint}
                                    onChange={(event, newValue) => {
                                        setReview({...review, ratingPoint: newValue});
                                    }}
                                    
                                /></div>
                            <textarea 
                                className={edit.content} 
                                value={review.description}
                                placeholder='Nhập đánh giá mới tại đây '
                                onChange={(e) => {
                                    setReview({...review, description: e.target.value});
                                }}
                                >
                                  
                            </textarea>
                           
                         
           <button className={edit.buttonedit}>
                <Button type='submit' 
                onClick={(e) => {updateReview(review)}}>
                    <Link to='/review' className={edit.textEdit}> <p className={edit.textEdit}>Xác nhận</p></Link>
               
                </Button>
            </button>
             </div>
             
        </>
    );
}
export default EditReview;