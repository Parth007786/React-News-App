import { useContext } from 'react';
import NewsContext from '../providers/news/NewsContext';
import CarouselImg from "./CarouselImg";
import './Carousel.css'; // Import the CSS file

const Carousel = () => {
    const { allNews } = useContext(NewsContext);
    // console.log(allNews)
    return (
        <div id="carouselExample" className="carousel slide custom-carousel ">
            <div className="carousel-inner custom-carousel-inner">
                {allNews.map((news, index) => (
                    <CarouselImg key={index} news={news} value={index} />

                ))}

            </div>
            <button
                className="carousel-control-prev custom-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next custom-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;
