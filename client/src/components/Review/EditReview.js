import edit from './edit.module.css'
import { StarFill, Star } from 'react-bootstrap-icons';
import { Rating, Button  } from '@mui/material';
import { useState,useReducer,useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { reviewID } from './Myreview';
import {USER} from '../../pages/MyReview/index.js'
const EditReview = ()=>{
     //chua hien review de edit
     const [review, setReview] = useState({
        ratingPoint: reviewID.ratingPoint,
        description: reviewID.description,
    });
    const config = USER ? {
        headers: {
            Authorization: `Bearer ${USER.token}`
        }
    } : {}
    
    const updateReview =async review =>{
        try {
            const response = await axios.put(`/api/reviews/updatereview/${reviewID._id}`, review,config)
           return response.data
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