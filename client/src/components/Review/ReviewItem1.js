import styles from './styles.module.css'
import { StarFill, Star } from 'react-bootstrap-icons';
import { Rating  } from '@mui/material';
import {UserState} from '../../Context/UserProvider/index.js'

// thu nghiem
function ReviewItem1({review:{_id,ratingPoint,description,creater}}) {
    const { userInfo } = UserState();
    return (
        <div className={styles.reviewContainer}>
            <div className = {styles.userIntro}>
                <img className = {styles.avatar} src="https://media.gq.com/photos/6283ce92bad17dc46fce8234/master/w_2000,h_1333,c_limit/East_Hampton,_New_York.jpg" 
                    alt="Avatar" 
                />
                <p className= {styles.name}>Nguyễn Việt Hoàng</p>
            </div>
                   
            <div className={styles.rating}>
                <Rating 
                    icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                    emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                    sx={{color: "#00A699"}}
                    value={5}
                    readOnly
                />
            </div>
            <p className= {styles.content}>Thằng em mình học bách khoa cơ khí, sinh năm 96. Tự mày mò học code rồi đi làm remote cho công ty Mỹ 2 năm nay. Mỗi tối online 3-4 giờ là xong việc. Lương tháng 3k6. Nhưng thu nhập chính vẫn là từ nhận các project bên ngoài làm thêm. Tuần làm 2,3 cái nhẹ nhàng 9,10k tiền tươi thóc thật không phải đóng thuế. Làm gần được 3 năm mà nhà xe nó đã mua đủ cả. Nghĩ mà thèm.</p>
            
        </div>
    );
}
export default ReviewItem1;
