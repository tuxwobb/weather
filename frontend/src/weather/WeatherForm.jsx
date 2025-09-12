import { useState, useRef } from "react";
import {
  fetchWeather,
  createCity,
  OPEN_WEATHER_API_KEY,
  OPEN_WEATHER_API_URL,
} from "../http";

export default function WeatherForm({ setCities }) {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const cityRef = useRef(null);

  //add city
  async function handleAddCity() {
    // check if city is not empty
    if (!cityRef.current.value) {
      setIsError({ message: "Please enter a city name" });
      return;
    }

    // check if city exists in OpenWeather API
    try {
      setIsError(null);
      setIsLoading(true);
      await fetchWeather(
        OPEN_WEATHER_API_URL,
        OPEN_WEATHER_API_KEY,
        cityRef.current.value
      );
      setIsLoading(false);
    } catch (error) {
      setIsError(error);
      setIsLoading(false);
      return;
    }

    // add city into cities
    try {
      setIsError(null);
      setIsLoading(true);
      const response = await createCity(cityRef.current.value);
      setCities((prevCities) => [
        ...prevCities,
        { name: cityRef.current.value, id: response.id },
      ]);
      setIsLoading(false);
    } catch (error) {
      setIsError(error);
      setIsLoading(false);
      return;
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col col-sm-8 col-md-6">
          <p>
            <input
              className="form-control form-control-sm mb-2"
              type="search"
              name="city"
              placeholder="Search..."
              ref={cityRef}
            />
            <button
              className="btn btn-sm btn-secondary mb-1"
              onClick={handleAddCity}
            >
              Add
            </button>
          </p>
          {isError && (
            <p className="alert alert-danger" role="alert">
              {isError.message}
            </p>
          )}
          {isLoading && (
            <p className="alert alert-light" role="alert">
              {"Fetching cities"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
