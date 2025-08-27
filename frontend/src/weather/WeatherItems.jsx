import WeatherItem from "./WeatherItem";
import WeatherDetails from "./WeatherDetails";
import { useState } from "react";

export default function WeatherItems({ cities, handleDelete, setIsError }) {
  const [detailWeather, setDetailWeather] = useState(null);
  return (
    <>
      <div className="container mb-3">
        <div className="row">
          {cities.map((city) => (
            <WeatherItem
              key={city.id}
              city={city}
              handleDelete={handleDelete}
              setIsError={setIsError}
              setDetailWeather={setDetailWeather}
            />
          ))}
        </div>
      </div>
      {detailWeather && (
        <div className="container mb-3">
          <div className="row">
            <WeatherDetails
              apiData={detailWeather}
              setDetailWeather={setDetailWeather}
            />
          </div>
        </div>
      )}
    </>
  );
}
