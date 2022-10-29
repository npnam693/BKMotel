import styles from './style.module.css'
import { HeartFill, StarFill } from 'react-bootstrap-icons';
import Spacer from '../Spacer';

function FavouriteItem() {
    return (
        <div className={styles.wrapper}>
            <img className = {styles.img} src="https://kreatecube.com/usefull/vendor/12222/gallery/2971.jpg" 
                alt="Avatar" 
            />
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <p className={styles.address}>Quận Bình Thạnh, TP.HCM</p>
                        <span className={styles.name}>Phòng trọ Bear's House - The Riverside</span>
                    </div>
                    <HeartFill color="#00A699" size={25}/>
                </div>
                <Spacer width={168}/>
                <div className={styles.footer}>
                    <div className={styles.eval}>
                        <p>5.0 </p>
                        <StarFill color="#00A699" size={12}/>
                        <p>(318 đánh giá)</p>
                    </div>
                    <p style={{
                        fontWeight: 400,
                        fontSize: '1.4rem',
                        lineHeight: '2rem',
                    }}><span className={styles.price}>1.000.000đ</span> /tháng</p>
                </div>
            </div>
        </div>
    );
}

export default FavouriteItem;