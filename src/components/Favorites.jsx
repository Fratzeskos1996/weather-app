import PageLayout from "./PageLayout"
import { useSelector } from "react-redux"
import WeatherCard from "./WeatherCard";
import "./Favorites.css"

export default function Favorites() {
    const favorites = useSelector(state => state.Favorites.value);

    return (
        <>
            <PageLayout>

                {favorites.length === 0 ?
                    <p className="empty-message">No Favorites Yet!</p>
                    : <div className="favorites-container">
                        {favorites.map(city => (
                            <WeatherCard key={city.name} data={city} inputDisplay={false} />
                        ))}
                    </div>}

            </PageLayout>
        </>
    )
}