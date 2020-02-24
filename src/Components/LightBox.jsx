import React, { useState, useEffect } from 'react';
import './LightBox.css';

const LightBox = ({ images }) => {
  const [modal, setModal] = useState(false);
  const [slideIndex, setSlideIndex] = useState(-1);

  // handle looping of image viewing
  useEffect(() => {
    if (slideIndex > images.length - 1) {
      setSlideIndex(0);
    }
    if (slideIndex < 0) {
      setSlideIndex(images.length - 1);
    }
  }, [slideIndex, images]);

  // which direction do we want to go?
  const slideDirection = (n) => {
    if (!modal) {
      setModal(true);
    }
    let slideI = slideIndex;
    setSlideIndex((slideI += n));
  };

  // open selected slide directly in lightbox
  const openSlides = (n) => {
    setModal(true);
    setSlideIndex(n);
  };

  // simple Thumbnail component for lightbox
  const Thumbnail = ({ image, index }) => (
    <div className={`thumbRow  ${images.length <= 4 ? (images.length === 1 ? 'ch-40' : 'vh-30') : 'vh-20'}`}>
      <img
        className="thumbnail "
        src={image}
        onClick={() => openSlides(index)}
        alt="gallery"
      />
    </div>
  );

  // Component that opens in the lightbox
  const FullsizeSlide = ({ index, length, image, caption, isShown }) => (
    <>
      {isShown && (
        <div>
          <div className="numbertext whiteFont absolute">
            {index}/{length}
          </div>
          <img src={image} className="fullWidth slide" alt="gallery" />
          <div className="whiteFont">{caption}</div>
        </div>
      )}
    </>
  );

  console.log(images);
  return (
    <>
      <div className="flex jcenter">
        {/* Render out the images */}
        <div className="thumbContainer">
          {images.map((elem, index) => (
            <Thumbnail
              key={index.toString()}
              image={elem.image}
              index={index}
            />
          ))}
        </div>
      </div>
      {/* Handle lightbox */}
      {modal && (
        <div className="modal">
          <div
            className="cursor absolute top download"
            onClick={() => alert('Downloaded!')}
          >
            Download
          </div>
          <span
            className="close cursor whiteFont absolute"
            onClick={() => setModal(false)}
          >
            &times;
          </span>
          <div className="modal-content">
            {/* FullSize images */}
            {images.map((elem, index) => (
              <FullsizeSlide
                key={index.toString()}
                index={index + 1}
                length={images.length}
                image={elem.image}
                isShown={slideIndex === index}
                caption={elem.caption}
              />
            ))}

            <button className="prev" onClick={() => slideDirection(-1)}>
              &#10094;
            </button>
            <button className="next" onClick={() => slideDirection(1)}>
              &#10095;
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default LightBox;
