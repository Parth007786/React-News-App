
import Default from "../assets/NoImg.png";

const NewsCard = ({ news }) => {
    // Add a check to ensure `news` is defined
    if (!news) {
        return null;
    }

    return (
        <div className="card mb-3 bg-danger text-light">
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={news.urlToImage || Default}
                        alt="News"
                        className="img-fluid rounded-start"
                        style={{ height: "250px", objectFit: "contain" }}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body shadow">
                        <h5 className="card-title">{news.title}</h5>
                        <p className="card-text">{news.description}</p>
                        <p className="card-text">
                            <small className="text-primary">
                                {new Date(news.publishedAt).toLocaleDateString("en-IN")}
                            </small>
                            <a
                                href={news.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-primary float-end"
                            >
                                Read More
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
