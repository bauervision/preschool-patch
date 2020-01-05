import React from "react";
import { Carousel } from "react-responsive-carousel";
const ImageCarousel = ({ images }) => (
  <Carousel showArrows={true}>
    {images.map(img => (
      <div>
        <img src={img.src} alt=" gal" />
        <p className="legend">{img.info}</p>
      </div>
    ))}
  </Carousel>
);
export default ImageCarousel;
