import { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "./Asset/search.png";
import clear_icon from "./Asset/clear.png";
import cloud_icon from "./Asset/cloud.png";
import drizzle_icon from "./Asset/drizzle.png";
import rain_icon from "./Asset/rain.png";
import snow_icon from "./Asset/snow.png";
import wind_icon from "./Asset/wind.png";
import humidity_icon from "./Asset/humidity.png";
const Weather = () => {
  const [weatherData, setWeatherData] = useState("");
  const inputRef = useRef();
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": clear_icon,
    "13n": clear_icon,
  };
  const handleSearch = (city) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=db36225d66ea15f819957042ffee77f2`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const icon = allIcons[data.list[0].weather[0].icon];
        setWeatherData({
          city: data.city.name,
          tempreture: Math.floor(data.list[0].main.temp),
          humidity: data.list[0].main.humidity,
          windSpeed: data.list[0].wind.speed,
          icon: icon,
        });
      });
  };
  useEffect(() => {
    handleSearch("Dhaka");
  }, []);
  return (
    <div className="weather">
      <div className="weather-info">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter your city"
            defaultValue="dhaka"
            ref={inputRef}
          />
          <img
            src={search_icon}
            alt=""
            onClick={() => handleSearch(inputRef.current.value)}
          />
        </div>
        <img src={weatherData.icon} alt="" className="weather-icon" />

        <p className="tempereature">{weatherData.tempreture}°C</p>
        <p className="location">{weatherData.city}</p>
        <div className="weather-data">
          <div className="colum">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="colum">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
