import styles from './style.module.css'

import { StarFill, GeoAlt, Cash, House} from 'react-bootstrap-icons';

function RoomItem() {
    return (
        <a href = '/' className = {styles.wrapper}>
            <img className = {styles.img} src="https://kreatecube.com/usefull/vendor/12222/gallery/2971.jpg" 
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
                    <GeoAlt color="currentColor" size={18} />
                    <span className = {styles.locationContent}>Thủ Đức, TP.HCM</span>
                </div>
                <div className = {styles.cost}>
                    <Cash color="currentColor" size={18} />
                    <span className = {styles.costContent}>500.000 / tháng </span>
                </div>
                <div className = {styles.area}>
                    <House color="currentColor" size={18} />
                    <span className = {styles.areaContent}>10m2</span>
                </div>
            </div>
        </a>
    );
}

export default RoomItem;
