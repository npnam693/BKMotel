import styles from './style.module.css'
import { Link } from 'react-router-dom';
import { StarFill, GeoAlt, Cash, House} from 'react-bootstrap-icons';
import Button from '@mui/material/Button';



function RoomItem() {
    return (
        <Link to = '/detail/id' className = {styles.wrapper}>
            <img className = {styles.img} src="https://www.territorysupply.com/wp-content/uploads/2020/11/best-airbnbs-oklahoma.jpg" 
                alt="Avatar" 
            />
                     
            <div className={styles.content}>
                <div className = {styles.contentAction}>
                    <div className = {styles.likeWrapper}>
                        <Button  
                            variant="outlined" 
                            color='info'
                            sx={{
                                display: 'inline',
                                fontWeight: 'bold',
                                mx: 0.5,
                                fontSize: 14,
                                padding: '1px 10px',
                              }}
                            onClick = {(e) => e.preventDefault()}
                        >
                            Yêu thích
                        </Button>
                        <p className = {styles.province} > TPHCM </p>
                    </div>

                    <div className = {styles.rating}> 
                        <StarFill color="#00A699" size={10} style={{marginTop: -2}} />
                        <p className={styles.ratingPoint}>4.9</p>
                    </div>
                </div>
                <div className = {styles.location}>
                    <GeoAlt color="#000000" size={18}  style={{marginTop: -3}}/>
                    <span className = {styles.locationContent}>Thủ Đức, TP.HCM</span>
                </div>
                <div className = {styles.cost}>
                    <Cash color="#000000" size={18} style={{marginTop: -4}}/>
                    <span className = {styles.costContent}>500.000 / tháng </span>
                </div>
                <div className = {styles.area}>
                    <House color="#000000" size={18} style={{marginTop: -4}}/>
                    <span className = {styles.areaContent}>10m2</span>
                </div>
            </div>
        </Link>
    );
}

export default RoomItem;
