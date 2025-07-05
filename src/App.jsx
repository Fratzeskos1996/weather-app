import PageLayout from './components/PageLayout'
import WeatherCard from './components/WeatherCard'
import './App.css'
import { Provider } from "react-redux";
import store from "./components/store"
import Favorites from './components/Favorites';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {


  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            {/*Home Route*/}
            <Route
              path='/'
              element={
                <PageLayout>
                  <WeatherCard inputDisplay={true} />
                </PageLayout>} />
            {/*Favorite Route*/}
            <Route
              path='/favorites'
              element={<Favorites />}
            />
          </Routes>
        </Router>
      </Provider>
    </>
  )
}

export default App
