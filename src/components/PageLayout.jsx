import { Link } from "react-router-dom"

export default function PageLayout({ children }) {
    return (
        <>
            <nav>
                <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
            </nav>
            <header>
                <h1>Weather App</h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>Weather App © 2025</p>
            </footer>
        </>
    )
}