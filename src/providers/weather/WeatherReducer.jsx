const WeatherReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_WEATHER":
            return {
                ...state,
                weatherData: action.payload,
            };
        default:
            return state;
    }
}
export default WeatherReducer;