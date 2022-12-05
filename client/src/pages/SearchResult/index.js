import styles from './style.module.css'
import RoomItem from '../../components/RoomItem'
import SkeletonItem from '../../components/RoomItem/skeleton';
import axiosClient from '../../api/axiosClient.js';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function SearchResult() {
    const [data, setData] = useState()
    
    let navigate = useNavigate()
    const search = useLocation().search
    const province = new URLSearchParams(search).get('province');
    const area = parseInt(new URLSearchParams(search).get('area'));
    const money = (new URLSearchParams(search).get('money')).split(',')

    const lowerPrice = money[1] === '-1' ? null : parseInt(money[1]) * 1000
    const higherPrice = parseInt(money[0]) * 1000



    console.log(province, area, higherPrice , lowerPrice);
    console.log('higher', higherPrice, 'lower' , lowerPrice);

    useEffect(() => {
        axiosClient.get(`api/rooms/find`, {params: {
                lowerPrice: lowerPrice,
                higherPrice: higherPrice,
                province: province,
                area: area
            }})
            .then (res => {
                setData(res.data)
            })
            .catch (err => console.error(err))
    }, [search, navigate])



    const renderItem = () => {
        if (data === undefined){
            return Array(12).fill(1).map((el, i) =>
                <SkeletonItem key={i} />
            )
        }
        else {
            if (data.length === 0) {
                return <p className={styles.noItem}>Danh sách tìm kiếm trống</p>
            }
            return data.map(item => <RoomItem data={item}/>)
        }
    }
    return (    
        <div className = {styles.wrapper}>
        <div className = {styles.inner}>
            <div className = {styles.itemList}>
                {renderItem()}    
            </div>
        </div>
    </div> 
    );
}

export default SearchResult;