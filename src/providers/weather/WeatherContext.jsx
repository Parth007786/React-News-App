import { createContext, useReducer } from "react";
import WeatherReducer from "./WeatherReducer";
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const initialState = {
        weatherData: {},

    };

    const [state, dispatch] = useReducer(WeatherReducer, initialState)

    return (
        <WeatherContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WeatherContext.Provider>
    )
}


export default WeatherContext;