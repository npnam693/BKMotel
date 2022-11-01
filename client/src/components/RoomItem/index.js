import styles from './style.module.css'
import { Link } from 'react-router-dom';
import { StarFill, GeoAlt, Cash, House} from 'react-bootstrap-icons';

function RoomItem() {
    return (
        <Link to = '/detail/id' className = {styles.wrapper}>
            <img className = {styles.img} src="https://media.gq.com/photos/6283ce92bad17dc46fce8234/master/w_2000,h_1333,c_limit/East_Hampton,_New_York.jpg" 
                alt="Avatar" 
            />
                     
            <div className={styles.content}>
                <div className = {styles.contentAction}>
                    <div className = {styles.likeWrapper}>
                        <button className = {styles.likeBtn}>YÊU THÍCH</button>
                        <p className = {styles.province}> TPHCM </p>
                    </div>

                    <div className = {styles.rating}> 
                        <StarFill color="#00A699" size={9} />
                        <p className={styles.ratingPoint}>4.9</p>
                    </div>
                </div>
                <div className = {styles.location}>
                    <GeoAlt color="#000000" size={18} />
                    <span className = {styles.locationContent}>Thủ Đức, TP.HCM</span>
                </div>
                <div className = {styles.cost}>
                    <Cash color="#000000" size={18} />
                    <span className = {styles.costContent}>500.000 / tháng </span>
                </div>
                <div className = {styles.area}>
                    <House color="#000000" size={18} />
                    <span className = {styles.areaContent}>10m2</span>
                </div>
            </div>
        </Link>
    );
}

export default RoomItem;
