import { useState, useEffect } from "react";
import WeatherForm from "./WeatherForm";
import WeatherItems from "./WeatherItems";
import { getCities, deleteCity } from "../http.js";

export default function Weather() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  // initial fetch of cities from custom API
  useEffect(() => {
    async function fetchCities() {
      setIsError(null);
      setIsLoading(true);
      try {
        const data = await getCities();
        setCities(data);
      } catch {
        setIsLoading(false);
        setIsError({ message: "Error while fetching cities" });
      }
    }
    fetchCities();
    setIsLoading(false);
  }, []);

  // delete city in cusom API
  async function handleDeleteCity(city_id) {
    setIsError(null);
    setIsLoading(true);
    try {
      await deleteCity(city_id);
      setCities((prevCities) => prevCities.filter((c) => c["id"] !== city_id));
      setIsLoading(false);
    } catch (error) {
      setIsError(error);
      setIsLoading(false);
      return;
    }
  }

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <h3>Weather</h3>
          </div>
        </div>
      </div>

      <WeatherForm setCities={setCities} />

      {isLoading && (
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="alert alert-info">Loading...</div>
            </div>
          </div>
        </div>
      )}

      {isError && (
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="alert alert-danger">{isError.message}</p>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !isError && cities.length > 0 && (
        <div className="container">
          <div className="row">
            <WeatherItems
              cities={cities}
              handleDelete={handleDeleteCity}
              setIsError={setIsError}
            />
          </div>
        </div>
      )}
    </>
  );
}
