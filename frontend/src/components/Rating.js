import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text, color }) => {
    const sRatingFunc = (v) => {
        return value >= v ? "fas fa-star" : value >= (v - 1) ? "fas fa-star-half-alt" : "far fa-star"
    }
    return (
        <div className='rating'>
            <span><i className={sRatingFunc(1)} style={{ color }}></i></span>
            <span><i className={sRatingFunc(2)} style={{ color }}></i></span>
            <span><i className={sRatingFunc(3)} style={{ color }}></i></span>
            <span><i className={sRatingFunc(4)} style={{ color }}></i></span>
            <span><i className={sRatingFunc(5)} style={{ color }}></i></span>
            <span> {text && text}</span>
        </div>
    )
}
Rating.defaultProps = {
    color: "#f8e825"
}
Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string,
    color: PropTypes.string,
}
export default Rating