import styles from './style.module.css'
import { HeartFill, StarFill } from 'react-bootstrap-icons';
import { Divider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {memo} from 'react'

const theme = createTheme({
    components: {
        // Name of the component
        MuiDivider: {
            styleOverrides: {
                root: {
                    width: '50%',
                    marginBottom: '30px',
                    marginTop: '30px'
                }
            }
        }
    },
    palette: {
        bkmotel: {
            main: '#00A699',
        },
    },
});

function FavouriteItem({data, onRemove}) {
    const navigate = useNavigate()
    const gotoDetailPage = () => {
        navigate(`/detail/${data._id}`)
    }
    console.log(data)
    return (
        <ThemeProvider theme={theme}>
            <div className={styles.wrapper}>
                <img className = {styles.img} src={data.image[0]} 
                    alt="Avatar"
                    onClick={gotoDetailPage}
                />
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.title} onClick={gotoDetailPage}>
                            <p className={styles.address}>{data.district + ', ' + data.province}</p>
                            <span className={styles.name}>{data.title}</span>
                        </div>
                        <HeartFill onClick={()=>{onRemove(data._id)}} className={styles.heart} color="#00A699" size={25}/>
                    </div>
                    <Divider/>
                    <div className={styles.footer}>
                        <div className={styles.eval}>
                            <p>{(data.ratingPoint != null) ? data.ratingPoint.$numberDecimal : 0 } </p>
                            <StarFill color="#00A699" size={12}/>
                            <p>{data.ratingCount.toString()} đánh giá</p>
                        </div>
                        <p style={{
                            fontWeight: 400,
                            fontSize: '1.4rem',
                            lineHeight: '2rem',
                        }}><span className={styles.price}>{data.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span> /tháng</p>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default memo(FavouriteItem);