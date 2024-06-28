import Logo from "../assets/logo.png";
import { FaSearch } from 'react-icons/fa';
import { useContext, useState } from 'react';
import NewsContext from '../providers/news/NewsContext';
import WeatherContext from '../providers/weather/WeatherContext';
import { fetchNews } from '../providers/news/NewsAction';
import { fetchWeather } from '../providers/weather/WeatherAction';
import './Navbar.css';

const suggestionsList = ["Indian Politics", "Indian Business", "Indian Sports", "Bollywood", "Technology", "Health"];

const Navbar = () => {
    const { dispatch: newsDispatch } = useContext(NewsContext);
    const { dispatch: weatherDispatch } = useContext(WeatherContext);
    const [text, setText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const getNews = async (topic) => {
        try {
            const data = await fetchNews(topic);
            newsDispatch({
                type: "GET_NEWS",
                payload: data,
            });
        } catch (error) {
            console.error("Failed to fetch news data :", error);
        }
    };

    const getWeather = async (city) => {
        try {
            const data = await fetchWeather(city);
            weatherDispatch({
                type: "FETCH_WEATHER",
                payload: data,
            });
        } catch (error) {
            console.error("Failed to fetch weather data :", error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (text) {
            await getNews(text);
            await getWeather(text);
            setText("");
            setShowSuggestions(false);
        }
    };

    const handleLinkClick = async (e, topic) => {
        e.preventDefault();
        await getNews(topic);
        await getWeather(topic);
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setText(input);
        if (input.length > 0) {
            const filteredSuggestions = suggestionsList.filter(suggestion =>
                suggestion.toLowerCase().includes(input.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = async (suggestion) => {
        setText(suggestion);
        setShowSuggestions(false);
        await getNews(suggestion);
        await getWeather(suggestion);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light shadow fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={Logo} alt="Logo" className="d-inline-block align-top custom-logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-3 custom-nav-links">
                        <li className="nav-item">
                            <a className="nav-link"
                                href="/"
                                onClick={(e) => handleLinkClick(e, "Indian Politics")}
                            >Politics</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                                href="/"
                                onClick={(e) => handleLinkClick(e, "Indian Business")}
                            >Business</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                                href="/"
                                onClick={(e) => handleLinkClick(e, "Indian Sports")}
                            >Sports</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                                href="/"
                                onClick={(e) => handleLinkClick(e, "Bollywood")}
                            >Entertainment</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                                href="/"
                                onClick={(e) => handleLinkClick(e, "Technology")}
                            >Tech</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                                href="/"
                                onClick={(e) => handleLinkClick(e, "NASA")}
                            >Space</a>
                        </li>
                    </ul>
                    <form className="d-flex ms-auto custom-form"
                        onSubmit={handleSearch}
                    >
                        <div className="input-group">
                            <span className="input-group-text bg-light" id="search-icon">
                                <FaSearch />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                value={text}
                                onChange={handleInputChange}
                                aria-label="Search"
                                aria-describedby="search-icon"
                            />
                            <button className="btn btn-secondary" type="submit">Go</button>
                        </div>
                        {showSuggestions && (
                            <ul className="suggestions-list">
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
