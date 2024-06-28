
const CarouselImg = ({ news, value }) => {
    return (
        <div
            className={value === 0
                ? "carousel-item active"
                : "carousel-item"}>
            <img
                src={news.urlToImage}
                style={{ height: "60vh", objectFit: "cover" }}
                className="d-block w-100"
                alt="..." />
        </div>
    )
}

export default CarouselImg
