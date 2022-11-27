import styles from './style.module.css'
import RoomItem from '../../components/RoomItem'
import SkeletonItem from '../../components/RoomItem/skeleton';
import axios from 'axios';
import { useEffect, useState } from 'react';


function HomePage() {
    const [data, setData] = useState()
    const [paging, setPaing] = useState(0)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axios.get('api/rooms/', {params: {num: 12 + 8*paging}})
            .then (res => {
                setLoading(true)
                setData(res.data)
                setLoading(false)
            })
            .catch (err => console.error(err))
    }, [paging])

    if (!loading)
        console.log(data)
    return (
        <div className = {styles.wrapper}>
            <div className = {styles.inner}>
                <div className = {styles.itemList}>
                    {
                        loading ?  
                        Array(12+8*paging).fill(1).map((el, i) =>
                            <SkeletonItem key={i} />
                        ) : 
                        data.map((item, index) => 
                            <RoomItem data={item} />
                        )
                    }
                </div>
            </div>
        </div> 
    );
}

export default HomePage;