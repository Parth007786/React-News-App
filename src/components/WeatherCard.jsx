import { FaTint, FaWind, FaThermometerHalf } from 'react-icons/fa';
import WeatherContext from '../providers/weather/WeatherContext';
import { useContext, useEffect, useState } from 'react';
import NewsContext from '../providers/news/NewsContext';
import { fetchNews } from '../providers/news/NewsAction';
import { fetchWeather } from '../providers/weather/WeatherAction';

const WeatherCard = () => {
    const { weatherData, dispatch } = useContext(WeatherContext);
    const { dispatch: newsDispatch } = useContext(NewsContext);

    const [city, setCity] = useState("");

    const getWeather = async (city) => {
        try {
            const data = await fetchWeather(city);
            dispatch({
                type: "FETCH_WEATHER",
                payload: data,
            });
            getNews(city); // Fetch news based on the city
        } catch (error) {
            console.error("Failed to fetch weather data :", error);
        }
    };

    const getNews = async (city) => {
        try {
            const data = await fetchNews(city);
            newsDispatch({
                type: "GET_NEWS",
                payload: data,
            });
        } catch (error) {
            console.error("Failed to fetch news data :", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (city) {
            getWeather(city);
            setCity("");
        }
    };

    useEffect(() => {
        getWeather("Indore");
    }, []);

    if (!weatherData) {
        return (
            <div className="col-sm-12 col-md-4">
                <h1 className="text-center text-dark">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="col-12">
            <div className="card p-3 bg-dark text-light shadow">
                <h3>Todays Weather</h3>
                <form className="my-3 d-flex" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter City Name"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button className="btn btn-success my-3 ms-2">Search Weather</button>
                </form>
                {weatherData.current && weatherData.location ? (
                    <span className="d-flex align-items-center justify-content-between">
                        <span>
                            <h1>
                                <FaThermometerHalf /> {weatherData.current.temp_c}°C
                            </h1>
                            <h2>{weatherData.location.name}</h2>
                        </span>
                        <span className="text-center">
                            <img
                                style={{ height: "40px" }}
                                src={weatherData.current.condition.icon}
                                alt=""
                            />
                            <p>{weatherData.current.condition.text}</p>
                            <h4><FaTint /> Humidity: {weatherData.current.humidity}%</h4>
                            <h4><FaWind /> Wind Speed: {weatherData.current.wind_kph} KM/H</h4>
                            <h4>Date and Time: {weatherData.location.localtime}</h4>
                        </span>
                    </span>
                ) : (
                    <p>No weather data available</p>
                )}
            </div>
        </div>
    );
};

export default WeatherCard;
