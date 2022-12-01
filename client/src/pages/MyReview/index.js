import MyReviewItem from '../../components/Review/Myreview.js';
import styles from './style.module.css';
import {UserState} from '../../Context/UserProvider/index.js'
import axios from "axios"
import { useContext,useEffect,useReducer } from "react"
import {reviewReducer} from "../../components/Review/reviewReducer/reviewReducer.js"
export let USER=null
function MyReviewPage() {
    const { userInfo } = UserState();
    //State
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
            const response =await axios.get("/api/reviews/reviewuser",config)
            dispatch({type:'REVIEW_LOADED_SUCCESS',payload: response.data.reviews})
            
        } catch (error) {
            return error
        }
    }
    useEffect(()=> {getReviewUser()},[])
    
  let body=null
      body=(
        <div className = {styles.userReviews}>
           { reviewState.reviews.map(review =>(
            
                 <MyReviewItem review={review}/>
           
           ))
           }
       
         </div>
    )
    
    return (
        <>
        <div className = {styles.userReviews}>
            <p className={styles.text1}>My review</p>
        </div>
        {body}
        </>
        )
}

export default MyReviewPage;