// Weather.js
import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "adc10f7c7c81db130fa20e61f556a865"; // Replace with your API key
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric", // or 'imperial' for Fahrenheit
        },
      });
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
          className="px-4 py-2 w-full mr-2 border rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
        >
          Get Weather
        </button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      {weatherData && (
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">{weatherData.name}</h2>
          <div className="flex items-center">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
              className="mr-2"
            />
            <span>{weatherData.weather[0].description}</span>
          </div>
          <div className="mt-2">
            Temperature: {weatherData.main.temp}°C
          </div>
          <div>Humidity: {weatherData.main.humidity}%</div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
