import Carousel from 'react-bootstrap/Carousel';
import img1 from './image/img1.jpg'
import img2 from './image/img2.jpg';
import img3 from './image/img3.jpg';

function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={img1} style={{width:'100%',height:'600px'}}/>
        <Carousel.Caption>
          <b><h4 id='sliderhead'>Welcome to</h4></b>
          <h1 id='sliderhead1'>FOOD ZONE</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img2} style={{width:'100%',height:'600px'}}/>
        <Carousel.Caption>
          <b><h3 id='sliderhead2'>Discover Restaurants and your favourite tastes</h3></b>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img3} style={{width:'100%',height:'600px'}}/>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
