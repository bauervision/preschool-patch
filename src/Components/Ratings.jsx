import React from 'react';

import { Star, StarEmpty } from '../images';

const Ratings = ({ rating, reviews }) => {
  const titleString = rating ? `Current Rating: ${rating}/5 ${reviews ? `based on ${reviews} reviews` : ''}` : 'No Reviews yet';
  return (
    <div className="Flex JustifyCenter AlignItems" title={titleString}>
      {rating > 0 ? (
        <>
          <img src={Star} alt="rating star" />
          <img src={rating >= 2 ? Star : StarEmpty} alt="rating star" />
          <img src={rating >= 3 ? Star : StarEmpty} alt="rating star" />
          <img src={rating >= 4 ? Star : StarEmpty} alt="rating star" />
          <img src={rating === 5 ? Star : StarEmpty} alt="rating star" />
        </>
      ) : (
        <>
          <img src={StarEmpty} alt="rating star" />
          <img src={StarEmpty} alt="rating star" />
          <img src={StarEmpty} alt="rating star" />
          <img src={StarEmpty} alt="rating star" />
          <img src={StarEmpty} alt="rating star" />
        </>
      )}

    </div>
  );
};
export default Ratings;
