import Home from "./pages/Home"
import { NewsProvider } from "./providers/news/NewsContext"
import { WeatherProvider } from "./providers/weather/WeatherContext"

const App = () => {
  return (
    <NewsProvider>
      <WeatherProvider>
        <Home />
      </WeatherProvider>
    </NewsProvider>
  )
}

export default App
