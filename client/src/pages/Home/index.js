import styles from './style.module.css'
import RoomItem from '../../components/RoomItem'
function HomePage() {
    return (
        <div className = {styles.wrapper}>
            <div className = {styles.inner}>
                <div className = {styles.itemList}>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                    <RoomItem></RoomItem>
                </div>
            </div>
        </div> 
    );
}

export default HomePage;