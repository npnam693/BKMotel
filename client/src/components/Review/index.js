import styles from './styles.module.css'
import { StarFill, Star } from 'react-bootstrap-icons';
import { Rating  } from '@mui/material';
import Divider from '@mui/material/Divider';

function ReviewItem({reviewR}) {
    return (
        <div className={styles.reviewContainer}>
            <div className = {styles.userIntro}>
                <img className = {styles.avatar} src={reviewR.creator.avatar} 
                    alt="Avatar" 
                />
                <p className= {styles.name}>{reviewR.creator.name}</p>
            </div>
                   
            <div className={styles.rating}>
                <Rating 
                    icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                    emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                    sx={{color: "#00A699"}}
                    value={reviewR.ratingPoint}
                    readOnly
                />
            </div>
            <Divider sx={{marginLeft: "100px", marginTop:'10px'}}/>

            <p className= {styles.content}>{reviewR.description}</p>
            
        </div>
    );
}

export default ReviewItem;
