import { useEffect, useState } from "react"



export default function WeatherCard() {

    const [tempFormat, setTempFormat] = useState(true)
    const [input, setInput] = useState("")
    const [city, setCity] = useState('Thessaloniki')
    const [weatherData, setWeatherData] = useState({})

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
    useEffect(() => { getWeather(city) }, [city])


    function handleSubmit(e) {
        e.preventDefault();
        setCity(input);
        setInput("");
    }

    function switchFormat() {
        setTempFormat(prev => !prev)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input placeholder="Search City" value={input} onChange={(e) => setInput(e.target.value)} /><br />
                <button onClick={(e) => setCity(e.target.value)}>Search</button>
            </form>
            <div className="weatherContainer">
                <h3>{weatherData.name}</h3>
                <p>{weatherData.description} <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="Weather Icon" /></p>
                <p>Temperature: {tempFormat ? Math.round(weatherData.temp - 273.15) : Math.round((weatherData.temp - 273.15) * 1.8 + 32)} {tempFormat ? "°C" : "°F"}</p>
                <p>Humidity: {weatherData.humidity} %</p>
                <p>Wind Speed: {weatherData.speed * 3600 / 1000} Km/h</p>
            </div>
            <button onClick={switchFormat}>{tempFormat ? "Celsius" : "Fahrenheit"}</button>
        </>
    )
}