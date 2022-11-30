import styles from './style.module.css'
import FavouriteItem from '../../components/FavouriteItem';
import RoomItem from '../../components/RoomItem'
import SkeletonItem from '../../components/RoomItem/skeleton';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function SearchResult({}) {
    let navigate = useNavigate()
    const search = useLocation().search

    const [data, setData] = useState()

    const province = new URLSearchParams(search).get('province');
    const area = parseInt(new URLSearchParams(search).get('area'));
    const money = parseInt(new URLSearchParams(search).get('money'));
    const [loading, setLoading] = useState(true)
    console.log(province, area, money);

    useEffect(() => {
        axios.get(`api/rooms/find`, {params: {
                lowerPrice: money,
                province: province,
                area: 100
            }})
            .then (res => {
                console.log(res.data)
                setLoading(true)
                setData(res.data)
                setLoading(false)
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