import styles from './style.module.css';
import { StarFill, GeoAlt, House, HouseDoor, PersonCheck, Ticket, Envelope, Telephone, Star} from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import ReviewItem from '../../components/Review';
import axiosClient from '../../api/axiosClient.js';
import { UserState } from '../../Context/UserProvider'
import Skeleton from '@mui/material/Skeleton';
import { useSnackbar } from 'notistack';

import { Rating, ImageList , ImageListItem, Button   } from '@mui/material';


function DetailPage() {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    var locationStr = ''
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()
    const { userInfo, userFavourites, setUserFavourites } = UserState()
    const {enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [reload, setReload] = useState(true)
    const [curNumReview,setCurNumReview]= useState(1)
    const [review, setReview] = useState({
        ratingPoint: 0,
        description: '',
        roomId:id
    });

    const toast = (message, variantType) => {
        enqueueSnackbar(message, {
            variant: variantType,
            action: (key) => (
                <Button style={{ fontSize: '12px', fontWeight: '600' }} size='small' onClick={() => closeSnackbar(key)}>
                    Dismiss
                </Button>
            )
        });
    }

    const config = userInfo ? {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    } : {}


    
    const handleLikeClick = () => {
        axiosClient.put('/api/rooms/favourites/add', {
            roomId: data.rooms._id
        }, config)
            .then(response => {
                setUserFavourites(response.data.favourites)
                toast(response.data.message, 'success')
            })
            .catch(err => {
                toast(err.response.data.message, 'error')
            })
    }


    useEffect(()=>{
        axiosClient.get(`/api/rooms/${id}`)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
            // eslint-disable-next-line
    
    }, [reload]) 



    let reviewRoom=null
    if (loading===false){
        locationStr = data.rooms.district +',' + data.rooms.province
        reviewRoom=data.reviews
    }
    
    let reviewsRoom=null
    if(reviewRoom)
    {
        reviewsRoom=(
            <div className = {styles.userReviews}>
                {reviewRoom.map((reviewR, index) =>{
                    if (index < curNumReview*5) return <ReviewItem reviewR={reviewR} />
                })}

                {
                    curNumReview*5 >= reviewRoom.length ? undefined 
                    : 
                    <Button
                        sx={{fontSize: '18px', color: 'black', border: '1px solid', marginTop: '20px', marginBottom: '20px'}} 
                        onClick={(e) => setCurNumReview(curNumReview +1)}
                        className = {styles.loadReviewBtn}>
                    Tải thêm
                    </Button>
                }

            </div>
        )
    }


    let numPointStart = 0;
    const countStar = [0,0,0,0,0,0] 
    if (loading == false) {
        data.reviews.map(review => {
            countStar[review.ratingPoint]++;
            numPointStart += review.ratingPoint
        })
    }

    const onSubmit= async review =>{
        if(review.ratingPoint===null){
            toast('Số sao phải lớn hơn 0', 'error')
            return
        } else {
            try {
            const response = await axiosClient.post(
                "/api/reviews/add",
                review,config
            );
            console.log('alo', data.reviews.length + 1, (numPointStart + review.ratingPoint)/(data.reviews.length + 1))
            axiosClient.put('/api/rooms/editrooms/reviews',{
                roomId: data.rooms._id,
                ratingCount: data.reviews.length + 1,
                ratingPoint: Math.round((numPointStart + review.ratingPoint)/(data.reviews.length + 1) * 10)/10
            }, config)
                .then(response => {
                    // setUserFavourites(response.data.favourites)
                    // toast(response.data.message, 'success')
                })
                .catch(err => {
                    // toast(err.response.data.message, 'error')
                })
                toast('Đánh giá thành công', 'success')
                setReload(!reload)
            } catch (error) {return error} 
        }
    }
    const renderImg = () => {
        if (data.rooms.image.length === 1) {
            return( <ImageListItem key={data.rooms.image[0]}>
                        <img src={data.rooms.image[0]} alt={'Room'} 
                            style={{borderRadius:20, objectFit: '', width: 1300, height: 730}}
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
                                variant="contained"
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
                
                <ImageList sx={{ width: 640, height: 640 }} cols={2} gap={20}>
                        {data.rooms.image.slice(1).map((item, index) => (
                            <ImageListItem key={item}>
                                <img
                                    src={item}
                                    alt={'itemle'}
                                    loading="lazy"
                                    style = {{borderRadius: 15, objectFit: 'cover', height: '310px'}}
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
            (<div className = {styles.inner}>
                <Skeleton animation="wave" height={50} width="70%" style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={50} width="70%" style={{ marginBottom: 6 }} />
                <Skeleton sx={{ height: 480, width: '100%' }} animation="wave" variant="rectangular" />
                <Skeleton animation="wave" height={50}  style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={50}  style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={50}  style={{ marginBottom: 6 }} />
            
            </div>)
        :
            (<div className = {styles.inner}> 
            <div className = {styles.titleContainer}>
            <div>
                <h1 className = {styles.titleContent}>{data.rooms.title}</h1>  
                <div className = {styles.introContainer}>
                    <div className = {styles.rating}> 
                        <StarFill color="#00A699" size={9} />
                        <p className={styles.ratingPoint}>{Math.round(numPointStart / data.reviews.length * 10) / 10}</p>
                        <p className={styles.ratingCount}>{data.reviews.length} đánh giá</p>
                    </div>
                    <div className = {styles.location}>
                        <GeoAlt color="#000000" size={18} />
                        <p className = {styles.locationContent}>{locationStr}</p>
                    </div>
                    {userFavourites.some(userFavourite => userFavourite._id === data.rooms._id) ? (
                        <Button
                            variant="contained"
                            color='success'
                            sx={{
                                display: 'inline',
                                fontWeight: 'bold',
                                mx: 0.5,
                                fontSize: 14,
                                padding: '1px 10px',
                            }}
                            onClick={(e) =>{
                                e.preventDefault()
                                handleLikeClick()
                            }}
                        >
                            Đã yêu thích
                        </Button>): 
                        (<Button  
                            variant = "outlined" 
                            color = 'info'
                            sx = {{
                                display: 'inline',
                                fontWeight: 'bold',
                                mx: 0.5,
                                fontSize: 14,
                                padding: '1px 10px',
                            }}
                            onClick={(e) => {
                                e.preventDefault()
                                handleLikeClick()
                            }}
                        >
                            Yêu thích
                        </Button>)}
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
                            src={data.rooms.creator.avatar}
                            alt='avatar'
                        />

                        <p className = {styles.contactName}>{data.rooms.creator.name}</p>

                        <div className = {styles.phoneContainer}>
                            <Telephone color="#000000" size={32}/>
                            <a className = {styles.phoneContact}href = "tel:+data.rooms.creator.phoneNumber">{data.rooms.contact === "none" ? data.rooms.creator.phoneNumber : data.rooms.contact}</a>
                        </div>
                        <div className = {styles.emailContainer}>
                            <Envelope color="#000000" size={32}/>
                            <a className = {styles.emailContact}href = "data.rooms.creator.email">{data.rooms.creator.email}</a>
                        </div>
                    </div>
                </div>
                    
            </div>

            
            <div className = {styles.reviewsContainer}>
                <div className = {styles.ratingContainer}>
                    <p className = {styles.ratingTitle}>Đánh giá</p>
                    <div className = {styles.ratingOverview}>
                            <StarFill color="#00A699" size={20} />
                            <p>{Math.round(numPointStart / data.reviews.length * 10) / 10}</p>
                            <p>{data.reviews.length} đánh giá</p>                       
                    </div>
                    <div className = {styles.rowRating}>
                        <Rating 
                            icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                            emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                            sx={{color: "#00A699"}}
                            value={5}
                            readOnly
                        />
                        <p>{countStar[5]}</p>
                    </div>
                    <div className = {styles.rowRating}>
                        <Rating 
                            icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                            emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                            sx={{color: "#00A699"}}
                            value={4}
                            readOnly
                        />
                        <p>{countStar[4]}</p>
                    </div>
                    <div className = {styles.rowRating}>
                        <Rating 
                            icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                            emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                            sx={{color: "#00A699"}}
                            value={3}
                            readOnly
                        />
                        <p>{countStar[3]}</p>
                    </div>

                    <div className = {styles.rowRating}>
                        <Rating 
                            icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                            emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                            sx={{color: "#00A699"}}
                            value={2}
                            readOnly
                        />
                        <p>{countStar[2]}</p>
                    </div>
                    <div className = {styles.rowRating}>
                        <Rating 
                            icon={<StarFill size={20} style={{marginRight: 5}}/>} 
                            emptyIcon={<Star size={20} style={{marginRight: 5}}/>} 
                            sx={{color: "#00A699"}}
                            value={1}
                            readOnly
                        />
                        <p>{countStar[1]}</p>
                    </div>
                </div>
                <div className = {styles.review}>
                    <div className = {styles.reviewInput}>
                        <textarea 
                            className={styles.reviewText} 
                            rows="4" cols="50" max 
                            placeholder='Nhập đánh giá tại đây ... '
                            value={review.content}
                            onChange={(e) => {
                                setReview({...review, description: e.target.value});
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
                                    setReview({...review, ratingPoint: newValue});
                                }}
                            />
                             <Button 
                                type = 'submit'
                                onClick={(e) => {onSubmit(review)
                                }}
                                style={{fontSize: 16}}
                                >
                                Gửi đánh giá 
                                </Button>
                        </div>
                    </div>
                    
                    {reviewsRoom}


                </div>

            </div>
            </div>)
        }
        </div> 
    );
}




export default DetailPage;
