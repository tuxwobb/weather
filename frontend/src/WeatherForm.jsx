import { useState, useRef, useCallback } from "react";
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_API_URL } from "./helpers";

export default function WeatherForm({ setCities }) {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const cityRef = useRef(null);

  // add city
  const handleAddCity = useCallback(
    async function handleAddCity() {
      if (!cityRef.current.value) {
        setIsError({ message: "Please enter a city name" });
        return;
      }
      setIsError(null);
      setIsLoading(true);
      try {
        const result = await fetch(
          OPEN_WEATHER_API_URL +
            new URLSearchParams({
              q: cityRef.current.value,
              appid: OPEN_WEATHER_API_KEY,
              units: "metric",
              lang: "cz",
            }).toString()
        );
        if (!result.ok) {
          setIsError({ message: "City not found in OpenWeatherAPI." });
          setIsLoading(false);
          return;
        }
      } catch (error) {
        setIsError(error);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch("http://127.0.0.1:5000/cities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: cityRef.current.value }),
        });

        if (!response.ok) {
          setIsError({ message: "City already exists" });
          setIsLoading(false);
          return;
        }
      } catch (error) {
        setIsError({ message: error.message });
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setCities((prevCities) => [
        ...prevCities,
        { name: cityRef.current.value },
      ]);
    },
    [setCities]
  );

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col col-sm-8 col-md-6">
          <h1>Weather</h1>
          <p>
            <input
              className="form-control form-control-sm mb-1"
              type="text"
              name="city"
              placeholder="Search..."
              ref={cityRef}
            />
            <button
              className="btn btn-sm btn-primary mb-1"
              onClick={handleAddCity}
            >
              Add
            </button>
          </p>
          {isError && (
            <div className="alert alert-danger">
              <p>{isError.message}</p>
            </div>
          )}
          {isLoading && (
            <div className="alert alert-light">
              <p>{"Fetching cities"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
