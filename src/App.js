import './App.css';
import { useState } from 'react';

const api = {
  key: "90f6be23526475dec0201d3c04f6b339",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
      })
      .catch((error) => {
        console.error(error);
        setWeather({});
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {/* Weather Data Display */}
        {typeof weather.main !== "undefined" ? (
          <div>
            <p>{weather.name}</p>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>

            {/* Weather Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />

            {/* Wind Speed */}
            <p>Wind Speed: {(weather.wind.speed * 3.6).toFixed(2)} km/h</p>

            {/* Humidity */}
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
