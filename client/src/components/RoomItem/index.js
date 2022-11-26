import styles from './style.module.css'
import { Link } from 'react-router-dom';
import { StarFill, GeoAlt, Cash, House} from 'react-bootstrap-icons';
import Button from '@mui/material/Button';



function RoomItem({data}) {
    console.log('item', data.address)

    const formatNameAddress = (name) =>{
        if (name.substring(0, 9) === 'Thành phố') 
            return name.substring(10)
        if (name.substring(0, 4) === 'Tỉnh') 
            return name.substring(10)
        return name
    }


    return (
        <Link to = {`/detail/${data._id}`} className = {styles.wrapper}>
            <img className = {styles.img} src={data.image[0]}
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
                        <p className = {styles.province} > {formatNameAddress(data.province)} </p>
                    </div>

                    <div className = {styles.rating}> 
                        <StarFill color="#00A699" size={10} style={{marginTop: -2}} />
                        <p className={styles.ratingPoint}>{data.ratingPoint.$numberDecimal}</p>
                    </div>
                </div>
                <div className = {styles.location}>
                    <GeoAlt color="#000000" size={18}  style={{marginTop: -3}}/>
                    <span className = {styles.locationContent}> {formatNameAddress(data.district)} </span>
                </div>
                <div className = {styles.cost}>
                    <Cash color="#000000" size={18} style={{marginTop: -4}}/>
                    <span className = {styles.costContent}>{data.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})} /tháng </span>
                </div>
                <div className = {styles.area}>
                    <House color="#000000" size={18} style={{marginTop: -4}}/>
                    <span className = {styles.areaContent}>{data.area}m2</span>
                </div>
            </div>
        </Link>
    );
}

export default RoomItem;
