export const fetchWeather = async (city) => {
    const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=399e987a7b474b99ae3113730241106&q=${city}&aqi=no"
`
    );
    const data = await res.json();
    return data;
}

//Weather API = https://api.weatherapi.com/v1/current.json?key=399e987a7b474b99ae3113730241106&q=Indore&aqi=no"
