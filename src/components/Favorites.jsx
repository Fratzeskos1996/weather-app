import PageLayout from "./PageLayout"
import { useSelector } from "react-redux"
import WeatherCard from "./WeatherCard";

export default function Favorites() {
    const favorites = useSelector(state => state.Favorites.value);

    return (
        <>
            <PageLayout>
                {favorites.length === 0 ?
                    <p>No Favorite Yet!</p>
                    :
                    favorites.map(city =>
                        <WeatherCard key={city.name} inputDisplay={false} data={city} />
                    )}
            </PageLayout>
        </>
    )
}