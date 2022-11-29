import styles from './style.module.css'
import RoomItem from '../../components/RoomItem'
import SkeletonItem from '../../components/RoomItem/skeleton';
import axios from 'axios';
import { useEffect, useState } from 'react';



function HomePage() {
    const [data, setData] = useState()
    const [paging, setPaging] = useState(0)
    const [loading, setLoading] = useState(true)
    window.onscroll = function(ev) {
        console.log(document.body.scrollHeight)
        console.log(window.innerHeight + window.scrollY)
        if ((window.innerHeight + window.scrollY + 30) >= document.body.scrollHeight) {
            setPaging(paging+1)
            setLoading(true)
        }
    };
    useEffect(() => {
        axios.get('api/rooms/', {params: {num: 12 + 8*paging}})
            .then (res => {
                console.log(res.data)
                setLoading(true)
                setData(res.data)
                setLoading(false)
            })
            .catch (err => console.error(err))
    }, [paging])

    if (!loading)
        console.log(data)

    const renderItem = () => {
        if (data === undefined){
            return Array(12+8*paging).fill(1).map((el, i) =>
                <SkeletonItem key={i} />
            )
        }

        else {
            return Array(12+8*paging).fill(1).map((e1, i) => {
                if (i < data.length) return <RoomItem data={data[i]} />
                else return <SkeletonItem key={i} />
                }
            )}
        
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