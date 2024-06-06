import "../css/card.css";
import sunset from "../assets/sunset.gif";
import sunrise from "../assets/sunrise.gif";
import hot from "../assets/hot.gif";
import cold from "../assets/cold.gif";
import cloudy from "../assets/cloudy.gif";
import humidity from "../assets/humidity.png";
import pressure from "../assets/pressure.png";
import wind from "../assets/wind.gif";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import Card from "../components/Card";

export default function Home() {
  const [timeGap, setTimeGap] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    desc: "",
    icon: "",
    city: "Lahore",
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    pressure: "",
    sunrise: 0,
    sunset: 0,
    country: "",
    windSpeed: "",
  });
  const getData = (city) => {
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d8596b1261b43be39522177d29112a96`
      )
      .then((response) => {
        setData({
          desc: response.data.weather[0].main,
          icon: response.data.weather[0].icon,
          city: response.data.name,
          temp: response.data.main.temp,
          temp_max: response.data.main.temp_max,
          temp_min: response.data.main.temp_min,
          humidity: response.data.main.humidity,
          pressure: response.data.main.pressure,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          country: response.data.sys.country,
          windSpeed: response.data.wind.speed,
        });
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        setError("City not found. Please enter a valid city name.");
        setLoading(false);
      });
  };

  const handleOnChange = (e) => {
    clearTimeout(timeGap);
    const timeout = setTimeout(() => {
      getData(e.target.value);
    }, 500);
    setTimeGap(timeout);
  };

  return (
    <>
      <div>
        <div className="area">
          <ul className="circles">
            {Array.from({ length: 10 }).map((_, index) => (
              <li key={index}></li>
            ))}
          </ul>
        </div>
        <div className="container">
          <div className="card">
            <div className="inputData">
              <input
                type="search"
                className="inputField"
                placeholder="Enter City Name"
                onChange={handleOnChange}
              />
              <button className="btn" onClick={handleOnChange} type="submit">
                Search
              </button>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <>
                <div className="city">
                  <h3>
                    <i className="fa-sharp fa-solid fa-location-dot"></i>{" "}
                    {data.city} {data.country}
                  </h3>
                </div>
                <div className="info">
                  <h2>{data.temp} °C</h2>
                </div>
                <div className="boxes">
                  <Card
                    name="Max Temp"
                    icon={hot}
                    temp={data?.temp_max + " °C"}
                  />
                  <Card
                    name="Min Temp"
                    icon={cold}
                    temp={data?.temp_min + " °C"}
                  />
                  <Card
                    name="Wind Speed"
                    icon={wind}
                    temp={data?.windSpeed || "0"}
                  />
                  <Card
                    name="Feels Like"
                    icon={
                      data?.desc === ""
                        ? cloudy
                        : `https://openweathermap.org/img/wn/${data.icon}@2x.png`
                    }
                    temp={data?.desc || "Haze"}
                  />
                  <Card
                    name="Sunrise"
                    icon={sunrise}
                    temp={moment(data.sunrise * 1000).format("hh:mm a")}
                  />
                  <Card
                    name="Sunset"
                    icon={sunset}
                    temp={moment(data.sunset * 1000).format("hh:mm a")}
                  />
                  <Card name="Pressure" icon={pressure} temp={data?.pressure} />
                  <Card name="Humidity" icon={humidity} temp={data?.humidity} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
