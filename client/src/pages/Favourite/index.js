import styles from './style.module.css'
import Spacer from '../../components/Spacer';
import FavouriteItem from '../../components/FavouriteItem';

function FavouritePage() {
    return ( 
        <div className={styles.wrapper}>
            <div className={styles.header}>Danh sách quan tâm</div>
            <button className={styles.deleteBtn}>Xóa tất cả</button>
            <Spacer width={1268} />
            <div className={styles.listItem}>
                <FavouriteItem />
                <FavouriteItem />
                <FavouriteItem />
                <FavouriteItem />
                <FavouriteItem />
                <FavouriteItem />
                <FavouriteItem />
                <FavouriteItem />
                <FavouriteItem />
            </div>
        </div> 
    );
}

export default FavouritePage;