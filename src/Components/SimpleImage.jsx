import React from 'react';

const SimpleImage = ({ image, alt }) => {

    return (
        <img className="Image" src={image} alt={alt} />
    )
}
export default SimpleImage;