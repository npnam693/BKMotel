export const reviewReducer =(state,action) =>{
    const {type, payload} = action
    switch(type){
        case 'REVIEW_LOADED_SUCCESS':
        return {
            ...state,
            reviews:payload,
            reviewsLoading:false
        }
        case 'FIND_REVIEW':
            return {
                ...state,
                review:payload
            }    

            case 'UPDATE_REVIEW':
                const newReviews= state.review.map(review=>
                    review._id === payload._id ? payload : review
                )
                return {
                    ...state,
                    reviews: newReviews
            }
        default:
            return state
    }
}