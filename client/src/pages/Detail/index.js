import styles from './style.module.css';
import { StarFill, GeoAlt, House, HouseDoor, PersonCheck, Ticket, Envelope, Telephone, Star} from 'react-bootstrap-icons';
import { useState } from 'react';
import ReviewItem from '../../components/Review';


import { Rating, ImageList , ImageListItem, Button   } from '@mui/material';

function DetailPage() {
    const [review, setReview] = useState({
        star: 0,
        content: '',
    });
    console.log(review)

    const fakeImg = [
        'https://media.cntraveler.com/photos/5e18e330ac1cea00092e91d2/master/pass/airbnb-beach-dominican-6939168.jpeg',
        'https://www.territorysupply.com/wp-content/uploads/2020/11/best-airbnbs-oklahoma.jpg',
        'https://www.territorysupply.com/wp-content/uploads/2020/10/best-airbnb-in-new-mexico.jpg',
        'https://baoxaydung.com.vn/stores/news_dataimages/hiep/082020/04/11/1126_image001.jpg',
        // 'https://baoxaydung.com.vn/stores/news_dataimages/hiep/082020/04/11/1126_image001.jpg'
    ]
    
    const fakeConentInfo = ` Tọa lạc tại Thành phố Hồ Chí Minh, cách Bảo tàng Lịch sử Việt Nam 700 m và Chợ Tân Định 1,4 km, Bear's House - The Riverside cung cấp chỗ nghỉ với sân hiên và WiFi miễn phí trong toàn bộ khuôn viên cũng như chỗ đỗ xe riêng miễn phí cho khách lái xe. Chỗ nghỉ này nằm trong bán kính khoảng 1,7 km từ Trung tâm mua sắm Vincom, 1,9 km từ Nhà Hát Lớn Sài Gòn và 1,9 km từ Trụ sở UBND Thành phố Hồ Chí Minh. Trung tâm thương mại Union Square và Dinh Thống Nhất nằm cách nhà khách lần lượt 1,9 km và 2 km.
Phòng nghỉ tại Bear's House - The Riverside được trang bị bàn làm việc, TV màn hình phẳng, phòng tắm riêng, ga trải giường và khăn tắm. Một số phòng có tầm nhìn ra quang cảnh thành phố. Tất cả các phòng đều được bố trí ấm đun nước, máy điều hòa và tủ để quần áo.
Các địa danh nổi tiếng gần Bear's House - The Riverside bao gồm trung tâm thương mại Diamond Plaza, Bưu điện Trung tâm Sài Gòn và Nhà thờ Đức Bà. Sân bay gần nhất là sân bay quốc tế Tân Sơn Nhất, cách nhà khách 6 km.
Các địa danh nổi tiếng gần Bear's House - The Riverside bao gồm trung tâm thương mại Diamond Plaza, Bưu điện Trung tâm Sài Gòn và Nhà thờ Đức Bà. Sân bay gần nhất là sân bay quốc tế Tân Sơn Nhất, cách nhà khách 6 km.
`


    const renderImg = () => {
        if (fakeImg.length === 1) {
            return( <ImageListItem key={fakeImg[0]}>
                        <img src={fakeImg[0]} alt={'Room'} 
                            style={{borderRadius:20}}
                        />
                </ImageListItem>
            )
        }

        else if (fakeImg.length === 2){
            return (
                <ImageList sx={{ width: 1300, height: 640 }} cols={2} rowHeight={640} gap={20}>
                    {fakeImg.map((item) => (
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

        else if (fakeImg.length === 3){
            return (
                <ImageList sx={{ width: 1300, height: 560 }} cols={3} rowHeight={560} gap={20}>
                    {fakeImg.map((item) => (
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

        else if (fakeImg.length === 4){
            return (
            <div style={{display:'flex'}}>
                <img
                src={fakeImg[0]}
                alt={'itemle'}
                loading="lazy"
                style = {{borderRadius: 15, objectFit: 'cover', width: 508, height: 508, marginRight:20 }}
                />
                        

                <ImageList sx={{ width: 244, height: 508 }} cols={1} rowHeight={244} gap={20}>
                    {fakeImg.slice(2).map((item, index) => (
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
                    src={fakeImg[1]}
                    alt={'itemle'}
                    loading="lazy"
                    style = {{borderRadius: 15, objectFit: 'cover', width: 508, height: 508, marginLeft:20 }}
                    />
            
            </div>

            )
        }

        else if (fakeImg.length >= 5){
            return (
            <div style={{display:'flex'}}>
                <img
                    src={fakeImg[0]}
                    alt={'itemle'}
                    loading="lazy"
                    style = {{borderRadius: 15, objectFit: 'cover', width: 640, height: 640, marginRight:20 }}
                />
                
                <ImageList sx={{ width: 640, height: 640 }} cols={2} rowHeight={310} gap={20}>
                        {fakeImg.slice(1).map((item, index) => (
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
            <div className = {styles.inner}> 
                
                
                <div className = {styles.titleContainer}>
                <div>
                    <h1 className = {styles.titleContent}>Phòng trọ Bear's House - The Riverside </h1>  
                    <div className = {styles.introContainer}>
                        <div className = {styles.rating}> 
                            <StarFill color="#00A699" size={9} />
                            <p className={styles.ratingPoint}>4.9</p>
                            <p className={styles.ratingCount}>260 đánh giá</p>
                        </div>
                        <div className = {styles.location}>
                            <GeoAlt color="#000000" size={18} />
                            <p className = {styles.locationContent}>Thủ Đức, TP.HCM</p>
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
                        <p className = {styles.costContent}> 1.000.000đ </p>
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
                                    
                                    <p>Thủ Đức, TP.HCM</p>
                                </div>
                                <div className = {styles.highlight2}>
                                    <div className = {styles.highlightTitle}>
                                        <HouseDoor color="#000000" size={18}/>
                                        <span className = {styles.highlightTitleContent}>Diện tích</span>
                                    </div>

                                    <p>20m2</p>
                                </div>
                                <div className = {styles.highlight3}>
                                    <div className = {styles.highlightTitle}>
                                        <Ticket color="#000000" size={18}/>
                                        <span className = {styles.highlightTitleContent}>Số phòng trống</span>
                                    </div>
                                    <p>4 phòng</p>    
                                </div>
                            </div>
                            <div className = {styles.descriptionRoom}>
                                {fakeConentInfo.split('\n').map((item) => (
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

                            <p className = {styles.contactName}>Nguyễn Phi Nam</p>

                            <div className = {styles.phoneContainer}>
                                <Telephone color="#000000" size={32}/>
                                <a className = {styles.phoneContact}href = "tel:+0843092021">0843092021</a>
                            </div>

                            <div className = {styles.emailContainer}>
                                <Envelope color="#000000" size={32}/>
                                <a className = {styles.emailContact}href = "mailto:nguyenphinam@gmail.com">nguyenphainam@gmail.com</a>
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
            </div>
        </div> 
    );
}



export default DetailPage;