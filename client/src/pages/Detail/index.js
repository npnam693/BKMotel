import styles from './style.module.css';
import { StarFill, GeoAlt, House, HouseDoor, PersonCheck, Ticket, Envelope, Telephone, Star} from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import ReviewItem from '../../components/Review';
import axios from 'axios';
import { UserState } from '../../Context/UserProvider'
import Skeleton from '@mui/material/Skeleton';


import { Rating, ImageList , ImageListItem, Button   } from '@mui/material';
function DetailPage() {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    var locationStr = ''
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()

    useEffect(()=>{
        axios.get(`/api/rooms/${id}`)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    if (loading==false){
        console.log('helo', data.rooms.creator)
        locationStr = data.rooms.district +',' + data.rooms.province
    }

    const [review, setReview] = useState({
        star: 0,
        content: '',
    });

    const renderImg = () => {
        if (data.rooms.image.length === 1) {
            return( <ImageListItem key={data.rooms.image[0]}>
                        <img src={data.rooms.image[0]} alt={'Room'} 
                            style={{borderRadius:20}}
                        />
                </ImageListItem>
            )
        }
    

        else if (data.rooms.image.length === 2){
            return (
                <ImageList sx={{ width: 1300, height: 640 }} cols={2} rowHeight={640} gap={20}>
                    {data.rooms.image.map((item) => (
                        <ImageListItem key={item}>
                        <img
                            src={item}
                            alt={'itemle'}
                            loading="lazy"
                            style = {{borderRadius: 15, objectFit: 'cover'}}
                        />
                        </ImageListItem>
                    ))}
                </ImageList>
            )
        }

        else if (data.rooms.image.length === 3){
            return (
                <ImageList sx={{ width: 1300, height: 560 }} cols={3} rowHeight={560} gap={20}>
                    {data.rooms.image.map((item) => (
                        <ImageListItem key={item}>
                        <img
                            src={item}
                            alt={'itemle'}
                            loading="lazy"
                            style = {{borderRadius: 15, objectFit: 'cover'}}
                        />
                        </ImageListItem>
                    ))}
                </ImageList>
            )
        }

        else if (data.rooms.image.length === 4){
            return (
            <div style={{display:'flex'}}>
                <img
                src={data.rooms.image[0]}
                alt={'itemle'}
                loading="lazy"
                style = {{borderRadius: 15, objectFit: 'cover', width: 508, height: 508, marginRight:20 }}
                />
                        

                <ImageList sx={{ width: 244, height: 508 }} cols={1} rowHeight={244} gap={20}>
                    {data.rooms.image.slice(2).map((item, index) => (
                        <ImageListItem key={item}>
                            <img
                                src={item}
                                alt={'itemle'}
                                loading="lazy"
                                style = {{borderRadius: 15, objectFit: 'cover'}}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                    <img
                    src={data.rooms.image[1]}
                    alt={'itemle'}
                    loading="lazy"
                    style = {{borderRadius: 15, objectFit: 'cover', width: 508, height: 508, marginLeft:20 }}
                    />
            
            </div>

            )
        }

        else if (data.rooms.image.length >= 5){
            return (
            <div style={{display:'flex'}}>
                <img
                    src={data.rooms.image[0]}
                    alt={'itemle'}
                    loading="lazy"
                    style = {{borderRadius: 15, objectFit: 'cover', width: 640, height: 640, marginRight:20 }}
                />
                
                <ImageList sx={{ width: 640, height: 640 }} cols={2} rowHeight={310} gap={20}>
                        {data.rooms.image.slice(1).map((item, index) => (
                            <ImageListItem key={item}>
                                <img
                                    src={item}
                                    alt={'itemle'}
                                    loading="lazy"
                                    style = {{borderRadius: 15, objectFit: 'cover'}}
                                />
                            </ImageListItem>
                        ))}
                </ImageList>
            
            </div>
            )
        }
    }
    return (
        <div className = {styles.wrapper}>
        {loading ? 
            (<>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </>)
        :
            (<div className = {styles.inner}> 
            <div className = {styles.titleContainer}>
            <div>
                <h1 className = {styles.titleContent}>{data.rooms.title}</h1>  
                <div className = {styles.introContainer}>
                    <div className = {styles.rating}> 
                        <StarFill color="#00A699" size={9} />
                        <p className={styles.ratingPoint}>{data.rooms.ratingPoint.$numberDecimal
}</p>
                        <p className={styles.ratingCount}>{data.rooms.ratingCount} đánh giá</p>
                    </div>
                    <div className = {styles.location}>
                        <GeoAlt color="#000000" size={18} />
                        <p className = {styles.locationContent}>{locationStr}</p>
                    </div>
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
                    >   Yêu thích   </Button>
                </div>
            </div>
            
            <div className = {styles.costContainer}>
                <p className = {styles.costTitle}> GIÁ PHÒNG </p>
                <div className = {styles.cost}>
                    <p className = {styles.costContent}>
                        {data.rooms.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                    </p>
                    <p> / tháng </p>
                </div>
            </div>
            </div>
            {renderImg()}               
        
            <div className = {styles.infoContainer}>
                <div className = {styles.infoRoom}>
                    <div className = {styles.infoTitleWrapper}> 
                        <House color="#000000" size={30}/>
                        <p className = {styles.infoTitle}>Thông tin phòng</p>
                    </div>
                    <div className = {styles.createAt}>
                        <span>Được đăng ngày </span>
                        <span className = {styles.dateCreate}>13/10/2022</span>
                    </div>
                    <div className = {styles.divider}></div>
                    <div className = {styles.infoRoomContent}>
                        <div className = {styles.highlightContainer}>
                            <div className = {styles.highlight1}>
                                <div className = {styles.highlightTitle}>
                                    <GeoAlt color="#000000" size={18} />
                                    <span className = {styles.highlightTitleContent}>Khu vực</span>        
                                </div>
                                
                                <p>{data.rooms.province}</p>
                            </div>
                            <div className = {styles.highlight2}>
                                <div className = {styles.highlightTitle}>
                                    <HouseDoor color="#000000" size={18}/>
                                    <span className = {styles.highlightTitleContent}>Diện tích</span>
                                </div>

                                <p>{data.rooms.area}m2</p>
                            </div>
                            <div className = {styles.highlight3}>
                                <div className = {styles.highlightTitle}>
                                    <Ticket color="#000000" size={18}/>
                                    <span className = {styles.highlightTitleContent}>Số phòng trống</span>
                                </div>
                                <p>{data.rooms.remainCount} phòng</p>    
                            </div>
                        </div>
                        <div className = {styles.descriptionRoom}>
                            {data.rooms.description.split('\n').map((item) => (
                                <p className = {styles.descRoomParagraph}>
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>

            

                </div>

                <div className = {styles.infoContact}>
                    <div className = {styles.infoTitleWrapper}>
                        <PersonCheck color="#000000" size={32} />
                        <p className = {styles.infoTitle}>Thông tin liên hệ</p>
                    </div>

                    <div className = {styles.createAt}>
                        <span>Tham gia từ ngày </span>
                        <span className = {styles.dateCreate}> 13/10/2022</span>
                    </div>
                    <div className = {styles.divider}></div>

                    <div className = {styles.infoContactContent}>
                        <img className = {styles.avatar} 
                            src="https://as01.epimg.net/meristation_en/imagenes/2022/09/16/news/1663350140_632920_1663350705_noticia_normal.jpg"
                            alt='avatar'
                        />

                        <p className = {styles.contactName}>{data.rooms.creator.name}</p>

                        <div className = {styles.phoneContainer}>
                            <Telephone color="#000000" size={32}/>
                            <a className = {styles.phoneContact}href = "tel:+0843092021">{data.rooms.creator.phoneNumber}</a>
                        </div>

                        <div className = {styles.emailContainer}>
                            <Envelope color="#000000" size={32}/>
                            <a className = {styles.emailContact}href = "mailto:nguyenphinam@gmail.com">{data.rooms.creator.email}</a>
                        </div>
                    </div>
                </div>
                    
            </div>

            
            <div className = {styles.reviewsContainer}>
                <div className = {styles.ratingContainer}>
                    <p className = {styles.ratingTitle}>Đánh giá</p>
                    <div className = {styles.ratingOverview}>
                            <StarFill color="#00A699" size={20} />
                            <p>4.9</p>
                            <p>260 đánh giá</p>                       
                    </div>
                    <div className = {styles.rowRating}>
                        <Rating 
                            icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                            emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                            sx={{color: "#00A699"}}
                            value={5}
                            readOnly
                        />
                        <p>100</p>
                    </div>
                    <div className = {styles.rowRating}>
                        <Rating 
                            icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                            emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                            sx={{color: "#00A699"}}
                            value={4}
                            readOnly
                        />
                        <p>100</p>
                    </div>
                    <div className = {styles.rowRating}>
                        <Rating 
                            icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                            emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                            sx={{color: "#00A699"}}
                            value={3}
                            readOnly
                        />
                        <p>100</p>
                    </div>

                    <div className = {styles.rowRating}>
                        <Rating 
                            icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                            emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                            sx={{color: "#00A699"}}
                            value={2}
                            readOnly
                        />
                        <p>100</p>
                    </div>
                    <div className = {styles.rowRating}>
                        <Rating 
                            icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                            emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                            sx={{color: "#00A699"}}
                            value={1}
                            readOnly
                        />
                        <p>100</p>
                    </div>
                </div>
                <div className = {styles.review}>
                    <div className = {styles.reviewInput}>
                        <textarea 
                            class={styles.reviewText} 
                            rows="4" cols="50" max 
                            placeholder='Nhập đánh giá tại đây ... '
                            value={review.content}
                            onChange={(e) => {
                                setReview({...review, content: e.target.value});
                            }}
                            >
                        </textarea>
                        <div className = {styles.rowRatingInput}>
                            <Rating 
                                icon={<StarFill size={32} style={{marginRight: 5}}/>} 
                                emptyIcon={<Star size={32} style={{marginRight: 5}}/>} 
                                sx={{color: "#00A699"}}
                                value={review.star}
                                onChange={(event, newValue) => {
                                    setReview({...review, star: newValue});
                                }}
                            />
                            <button className = {styles.submitReviewBtn}>Gửi đánh giá </button>
                        </div>
                    </div>
                    
                    <div className = {styles.userReviews}>
                        <ReviewItem />
                        <ReviewItem />
                        <ReviewItem />
                        <ReviewItem />
                        <button className = {styles.loadReviewBtn}>Tải thêm</button>
                    </div>


                </div>

            </div>
            </div>)
        }
        </div> 
    );
}



export default DetailPage;