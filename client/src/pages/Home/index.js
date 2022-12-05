import styles from './style.module.css'
import RoomItem from '../../components/RoomItem'
import SkeletonItem from '../../components/RoomItem/skeleton';
import axiosClient from '../../api/axiosClient.js';
import { useEffect, useState } from 'react';

function HomePage() {
    const [data, setData] = useState([])
    const [paging, setPaging] = useState(0)
    const [loading, setLoading] = useState(true)
    const [maxItem, setMaxItem] = useState(false)
    console.log(maxItem)
    window.onscroll = function(ev) { 
        if (maxItem) return
        else {
            if ((window.innerHeight + window.scrollY + 30) >= document.body.scrollHeight) {
                setPaging(paging+1)
                setLoading(true)
            }
        }
    };

    useEffect(() => {
        axiosClient.get('api/rooms/', {params: {num: 12 + 8*paging}})
            .then (res => {
                // console.log(res.data)
                setLoading(true)
                if (data.length === res.data.length) {
                    setMaxItem(true)
                }
                else setData(res.data)
                setLoading(false)
            })
            .catch (err => console.error(err))
    }, [paging])


    const renderItem = () => {
        if (data === undefined){
            return Array(12+8*paging).fill(1).map((el, i) =>
                <SkeletonItem key={i} />
            )
        }
        else {
            return Array(12+8*paging).fill(1).map((e1, i) => {
                if (i < data.length) return <RoomItem key = {i} data={data[i]} />
                else if (i >= data.length && !maxItem) return <SkeletonItem key={i} />
            }
            )
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

export default HomePage;