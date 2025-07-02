export default function PageLayout({ children }) {
    return (
        <>
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