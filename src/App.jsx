import PageLayout from './components/PageLayout'
import WeatherCard from './components/WeatherCard'
import './App.css'
import { Provider } from "@reduxjs/toolkit";
import { store } from "./components/store"

function App() {


  return (
    <>
      <Provider store={store}>
        <PageLayout>
          <WeatherCard />
        </PageLayout>
      </Provider>
    </>
  )
}

export default App
