import { useState } from "react";
import classes from "./ImageSlider.module.css";

const leftArrow = (
  <svg x="0px" y="0px" viewBox="0 0 31.494 31.494">
    <path
      style={{ fill: "#1E201D" }}
      d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554
c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587
c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"
    />
  </svg>
);

const rightArrow = (
  <svg x="0px" y="0px" viewBox="0 0 31.49 31.49">
    <path
      style={{ fill: "#1E201D" }}
      d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111
C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587
c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"
    />
  </svg>
);

const ImageSlider = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== images.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === images.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(images.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className={classes.containerSlider}>
      {images.map((image, index) => {
        return (
          <div
            key={index}
            className={
              slideIndex === index + 1
                ? `${classes.slide} ${classes.activeImg}`
                : classes.slide
            }
          >
            <img src={image} alt={index} />
          </div>
        );
      })}
      <button
        onClick={nextSlide}
        className={`${classes.btnSlide} ${classes.next}`}
      >
        {rightArrow}
      </button>
      <button
        onClick={prevSlide}
        className={`${classes.btnSlide} ${classes.prev}`}
      >
        {leftArrow}
      </button>

      <div className={classes.containerDots}>
        {images.map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={
              slideIndex === index + 1
                ? `${classes.dot} ${classes.active}`
                : classes.dot
            }
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
