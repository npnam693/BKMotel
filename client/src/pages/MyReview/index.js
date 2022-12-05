import MyReviewItem from '../../components/Review/Myreview.js';
import styles from './style.module.css';
import {UserState} from '../../Context/UserProvider/index.js'
import axiosClient from '../../api/axiosClient.js';
import {useEffect,useReducer,useState} from "react"
import {Divider} from '@mui/material'
import {reviewReducer} from "../../components/Review/reviewReducer/reviewReducer.js"
export let USER=null
function MyReviewPage() {
    const { userInfo } = UserState();
    const [loading, setLoading] = useState(true)
    
    const [reviewState, dispatch]= useReducer(reviewReducer,{
        review:null,
        reviews:[],
        reviewsLoading:true
    })
   USER=userInfo
    
    const config = userInfo ? {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    } : {}
    
   //get all review
    const getReviewUser = async()=>
    {
        try {
            const response =await axiosClient.get("/api/reviews/reviewuser",config)
            dispatch({type:'REVIEW_LOADED_SUCCESS',payload: response.data.reviews})
            setLoading(false)
            
        } catch (error) {
            return error
        }
    }
    useEffect(()=> {getReviewUser()},[])
    


    let body = loading ? null : (
         <div>
           { 
               reviewState.reviews.map(review =>{
                    if(review.room)
                    {
                return   <MyReviewItem review={review}/>
                     }
             })
           }
       
       </div>
    )
    
    return (
        <>
        <div className = {styles.wrapper}>

            <div className={styles.inner}>
        
                <div className={styles.heading}>
                    <div className={styles.header}>Đánh giá của tôi</div>
                </div>
                <Divider variant="middle"  />
                {body}
            </div>
       
        
        
        </div>
        </>
        )
}

export default MyReviewPage;
