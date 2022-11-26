import styles from './style.module.css'
import RoomItem from '../../components/RoomItem'
import SkeletonItem from '../../components/RoomItem/skeleton';
import axios from 'axios';
import { useEffect, useState } from 'react';

function HomePage() {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`api/rooms/`)
            .then (res => {
                setLoading(true)
                setData(res.data)
                setLoading(false)
            })
            .catch (err => console.error(err))
    }, [])

    if (!loading)
        console.log(data)
    return (
        <div className = {styles.wrapper}>
            <div className = {styles.inner}>
                <div className = {styles.itemList}>
                    {
                        loading ?  
                        Array(10).fill(1).map((el, i) =>
                            <SkeletonItem key={i} />
                        ) : 
                        data.map((item, index) => 
                            <RoomItem data = {item}/>
                        )
                    }
                </div>
            </div>
        </div> 
    );
}

export default HomePage;