import { useContext, useEffect } from "react"
import Carousel from "../components/Carousel"
import WeatherCard from "../components/WeatherCard"
import NewsCard from "../components/NewsCard"
import NewsContext from "../providers/news/NewsContext"
import { fetchNews } from "../providers/news/NewsAction"
import Navbar from "../components/Navbar"

const Home = () => {

    const { allNews, dispatch } = useContext(NewsContext);
    // console.log(all)
    const getNews = async (topic) => {
        const data = await fetchNews(topic);
        dispatch({
            type: "GET_NEWS",
            payload: data,
        });
    };
    useEffect(() => {
        getNews("Indore")
    }, []);

    if (allNews.length === 0) {
        return (
            <div className="container p-5 d-flex align-items-center justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <Carousel />
            <div className="mx-4 py-2">

                <WeatherCard />
            </div>
            <div className="container my-3">
                <h1 className="text-center my-3 card-mx-3 shadow">
                    Top News
                </h1>
            </div>
            <div className="col-sm-4 col-md-7 d-block float-end mx-5 card-md-3 shadow">
                {allNews.map((news, index) => (
                    <NewsCard key={index} news={news} />

                ))}
            </div>
        </div>
    );
};

export default Home
