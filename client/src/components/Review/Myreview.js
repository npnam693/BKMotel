import styles from './style.module.css'
import { StarFill, Star, PencilFill,TrashFill,} from 'react-bootstrap-icons';
import { Rating,Button,Divider } from '@mui/material';
import { Link } from 'react-router-dom'
import { useEffect, useState} from 'react';
import {USER} from '../../pages/MyReview/index.js'
import axiosClient from '../../api/axiosClient.js';
import { useSnackbar } from 'notistack';
export let reviewID=null

const MyReviewItem= ({review:{_id,ratingPoint,description,room}})=> {
    
  const [reload, setReload] = useState(true)
  useEffect(()=>{}, reload)
   
  const [review, setReview] = useState({
        _id:_id,
        ratingPoint: ratingPoint,
        description: description,
        room:room
  });
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
  const chooseReview= async reviewId=>
    {   
        reviewID=review
        console.log(reviewID)
        
    }
    const config = USER ? {
      headers: {
          Authorization: `Bearer ${USER.token}`
      }
  } : {}

  const deleteReview =async reviewId =>
  {
      console.log(review)
      // console.log(review.room._id, review.room.ratingCount, reviewID.room.ratingPoint.$numberDecimal)
      // console.log(review.room._id, review.room.ratingCount, parseFloat(reviewID.room.ratingPoint.$numberDecimal))
      axiosClient.delete(`/api/reviews/deletereview/${reviewId}`,config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      axiosClient.put('/api/rooms/editrooms/reviews',{
        roomId: review.room._id,
        ratingCount: review.room.ratingCount - 1,
        ratingPoint: review.room.ratingCount == 1 ? 0 : ((Math.round(((review.room.ratingCount * parseFloat(review.room.ratingPoint.$numberDecimal)) - review.ratingPoint)/(review.room.ratingCount-1) * 10)/10 > 5) ? 5 : Math.round(((review.room.ratingCount * parseFloat(review.room.ratingPoint.$numberDecimal)) - review.ratingPoint)/(review.room.ratingCount-1) * 10)/10 > 5)
      }, config)
          .then(response => {
            toast('Xoá đánh giá thành công', 'success')
            setReload(!reload)
          })
          .catch(err => {
              toast('Xoá đánh giá thất bại', 'error')
          })

  }
    let body=null
   
        body=(
        <div className={styles.wrapper}>
            <div className={styles.imgbox}>
              { <img className={styles.img} src={room.image[0]} alt="Room imgae" /> }
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.title}>
                  <p className={styles.address}>
                    {room.district + ", " + room.province}
                  </p>
                  <span className={styles.name}>{room.title}</span>
                </div>
              </div>
              <Divider />
              <div className={styles.footer}>
              <div className={styles.title}>
                  <p className={styles.address}>
                  <Rating 
                    icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                    emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                    sx={{color: "#00A699"}}
                    value={ratingPoint}
                    readOnly
                />
                  </p>
                  <span className={styles.name}>{description}</span>
                </div>
                
              </div>
              
            </div>
            <div className={styles.tools}>
             
              <Link to='/EditReview' onClick={chooseReview.bind(this,_id)}>
              <PencilFill className={styles.tool} />
              </Link>
              <Link  onClick={deleteReview.bind(this,_id)}>
              <TrashFill className={styles.tool} />
              </Link>
            </div>
          </div>
          )
    
    
    return (
        <>
        {body}
        </>
    );
}
export default MyReviewItem;
