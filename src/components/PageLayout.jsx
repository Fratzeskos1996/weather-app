import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toggleFormat } from "./store"
import "./PageLayout.css"

export default function PageLayout({ children }) {

    const dispatch = useDispatch()
    const format = useSelector(state => state.Favorites.tempFormat);

    return (
        <>
            <div className="container">
                <nav>
                    <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
                </nav>
                <header>
                    <h1>Weather App</h1>
                </header>
                <main className="main-page">
                    {children}
                    <button onClick={() => dispatch(toggleFormat())}>
                        {format === "celsius" ? "Celsius" : "Fahrenheit"}
                    </button>
                </main>
                <footer>
                    <p>Weather App © 2025</p>
                </footer>
            </div>
        </>
    )
}