import { useState, useCallback, useEffect } from "react";
import WeatherForm from "./WeatherForm";
import WeatherItems from "./WeatherItems";
import { CUSTOM_API_URL, getCities } from "./helpers";

export default function Weather() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  // initial fetch of cities from custom API
  useEffect(() => {
    try {
      setIsLoading(true);
      getCities().then((data) => {
        setCities(data["cities"]);
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(error);
    }
  }, []);

  // delete city in cusom API
  const handleDeleteCity = useCallback(async function handleDeleteCity(city) {
    try {
      const response = await fetch(`${CUSTOM_API_URL}/cities`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: city }),
      });
      if (!response.ok) {
        setIsError({ message: "Error deleting city" });
        return;
      }
    } catch (error) {
      setIsError(error);
      return;
    }
    setCities((prevCities) => prevCities.filter((c) => c["name"] !== city));
  }, []);

  return (
    <>
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
