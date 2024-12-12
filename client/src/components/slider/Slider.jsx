import { Slider } from "infinite-react-carousel";

function Slide({children, slidesToShow, arrowScroll}) { 
  return (
    <>
      <div className="w-full max-w-5xl mx-auto"> {/* Add a max-width and center it */}
        <Slider slidesToShow={slidesToShow} arrowScroll={arrowScroll}>
          {children}
        </Slider>
      </div>
    </>
  );
}

export default Slide;
