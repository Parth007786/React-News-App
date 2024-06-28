let dateString = new Date(Date.now()).toLocaleDateString("en-IN").split("/");
let year = dateString[2];
let month = dateString[1];
let day = dateString[0] - 1;

let formattedDate = `${year}-${month}-${day}`;

export const fetchNews = async (topic) => {
    const response = await fetch(
        `https://newsapi.org/v2/everything?q=${topic}&from=${formattedDate}&sortBy=publishedAt&apiKey=557a4679cd2c4e6d9ce3dde8a909928c`
    );
    const data = await response.json();
    return data.articles;
};
