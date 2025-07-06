import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { add, remove } from "./store"
import "./WeatherCard.css"


export default function WeatherCard({ inputDisplay, data = null }) {

    const [tempFormat, setTempFormat] = useState(true)
    const [input, setInput] = useState("")
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState({})
    const currentData = data || weatherData;
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.Favorites.value);
    const isFavorite = favorites.some(city => city.name === currentData.name);

    async function getCity(city) {

        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=7f0a0146a895d2c91b973c11a90cd38d`)

        const data = await response.json()

        const { lon, lat } = data[0];

        return { lon, lat }
    }

    async function getWeather(city) {

        try {
            const data = await getCity(city);

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=7f0a0146a895d2c91b973c11a90cd38d`)

            const weatherData = await response.json();

            console.log(weatherData)

            const { name,
                main: { humidity, temp },
                weather: [{ icon, description }],
                wind: { speed } } = weatherData;

            const formattedWeather = {
                name,
                humidity,
                temp,
                icon,
                description,
                speed
            }

            console.log(formattedWeather)

            setWeatherData(formattedWeather)

        } catch {

            throw new Error("No City Founded")

        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (!data) getWeather(city) }, [city, data])


    function handleSubmit(e) {
        e.preventDefault();
        setCity(input);
        setInput("");
    }

    function switchFormat() {
        setTempFormat(prev => !prev)
    }

    return (
        <>{(inputDisplay) ?
            <form onSubmit={handleSubmit}>
                <input placeholder="Search City" value={input} onChange={(e) => setInput(e.target.value)} /><br />
                <button>Search</button>
            </form>
            : ""}
            {currentData.name && (
                <div className="weatherContainer">
                    <h3>{currentData.name}</h3>
                    <p>{currentData.description}
                        <img src={`https://openweathermap.org/img/wn/${currentData.icon}@2x.png`} alt="Weather Icon" /></p>
                    <p>Temperature: {tempFormat ? Math.round(currentData.temp - 273.15)
                        : Math.round((currentData.temp - 273.15) * 1.8 + 32)}
                        {tempFormat ? "°C" : "°F"}</p>
                    <p>Humidity: {currentData.humidity} %</p>
                    <p>Wind Speed: {Math.round(currentData.speed * 3.6)} Km/h</p>
                    <button onClick={() =>
                        isFavorite
                            ? dispatch(remove({ name: currentData.name }))
                            : dispatch(add(currentData))
                    }>{isFavorite ? "🤍" : "♡"}</button>
                </div>)}
            <br />
            <button onClick={switchFormat}>
                {tempFormat ? "Celsius" : "Fahrenheit"}
            </button>
        </>
    )
}