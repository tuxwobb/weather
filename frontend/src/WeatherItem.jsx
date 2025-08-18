import { useEffect, useState } from "react";
import WeatherResult from "./WeatherResult";
import {
  fetchWeather,
  OPEN_WEATHER_API_KEY,
  OPEN_WEATHER_API_URL,
} from "./helpers";

export default function WeatherItem({
  city,
  handleDelete,
  setResults,
  setIsError,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      fetchWeather(OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY, city).then(
        (data) => {
          setApiData(data);
          setIsLoading(false);
        }
      );
    } catch (error) {
      setIsError({ error });
      setIsLoading(false);
    }
  }, [city, setIsError]);

  return (
    <>
      {isLoading && <p>Loading weather data...</p>}
      {!isLoading && apiData && (
        <WeatherResult
          result={apiData}
          city={city}
          handleDelete={handleDelete}
          setResults={setResults}
        />
      )}
    </>
  );
}
