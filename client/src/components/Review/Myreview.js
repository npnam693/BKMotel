import styles from './style.module.css'
import { StarFill, Star } from 'react-bootstrap-icons';
import { Rating,Button  } from '@mui/material';
import {Redirect} from 'react-router-dom'
import { reviewReducer } from './reviewReducer/reviewReducer';
import { Link } from 'react-router-dom';
import { useState,useReducer, useContext } from 'react';
import EditReview from './EditReview';
export let reviewID=null
const MyReviewItem= ({review:{_id,ratingPoint,description}})=> {
    
   
   

    const chooseReview= async reviewId=>
    {   
        reviewID=reviewId
        console.log(reviewID)
        
    }
    let body=null
   
        body=(<div className={styles.reviewContainer}>
            <img className = {styles.avatar} src="https://media.gq.com/photos/6283ce92bad17dc46fce8234/master/w_2000,h_1333,c_limit/East_Hampton,_New_York.jpg" 
                    alt="Avatar" 
                />
            <p className= {styles.address}>Quận Bình Thạnh,Thành Phố Hồ Chí Minh</p>    
            <div className = {styles.userIntro}>
                
                <p className= {styles.name}>Phòng trọ Bear's House - The Riverside</p>
            </div>
                   
            <div className={styles.rating}>
                <Rating 
                    icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                    emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                    sx={{color: "#00A699"}}
                    value={ratingPoint}
                    readOnly
                />
            </div>
           
            <button className={styles.buttonedit}>
            <Button onClick={chooseReview.bind(this,_id)}  >
               <Link to='/EditReview' className={styles.text1}> 
              Chỉnh sửa
               </Link>
                </Button>   
            </button>
           
            <button className={styles.buttondelete}>
                Xóa
            </button>
            <p className= {styles.content}>{description}</p>
            
        </div>)
    
    
    return (
        <>
        {body}
        </>
    );
}
export default MyReviewItem;
