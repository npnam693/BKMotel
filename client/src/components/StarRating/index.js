import styles from './style.module.css'
import {useState} from 'react'
import {StarFill} from 'react-bootstrap-icons'

console.log(styles)
const colors = {
    primary: "#00A699",
    grey: "#a9a9a9"  
};

function StarRating({
    number,
    size = 16,
    value,
}
) {

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(0);
    const stars = Array(5).fill(0)
    
    const handleClick = value => {
        setCurrentValue(value)
    }
    
    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };
    
    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }



    if (number > 0) {    
        return (
            <div className={styles.stars}>
                {stars.map((star, index) => {
                    return (
                        <StarFill
                        key={index}
                        size={size}
                        color={ index < number ? colors.primary : colors.grey}
                        style={{
                            marginRight: 10,
                        }}
                        />
                    )}
                )}
                <p className = {styles.starCount}>{value}</p>
            </div>
            )
    }
    else {
        return (
            <div className={styles.container}>
                <div style={styles.stars}>
                    {stars.map((_, index) => {
                    return (
                        <StarFill
                        key={index}
                        size={size}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={(hoverValue || currentValue) > index ? colors.primary : colors.grey}
                        style={{
                            marginRight: 10,
                            cursor: "pointer"
                        }}
                        />
                    )
                    })}
                </div>
            </div>
        );
    }
}

export default StarRating;
