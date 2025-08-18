import WeatherItem from "./WeatherItem";

export default function Weather({ cities, handleDelete, setIsError }) {
  return (
    <div className="container">
      <div className="row mt-3">
        {cities.map((city) => (
          <WeatherItem
            key={city["name"]}
            city={city["name"]}
            handleDelete={handleDelete}
            setIsError={setIsError}
          />
        ))}
      </div>
    </div>
  );
}
