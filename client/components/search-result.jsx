import WeatherCard from './weather-card';

const SearchResult = ({ forecast, city, state }) => {
  const { latitude, longitude } = forecast.length >= 1 ? forecast[0] : '';
  const { summary, temperature } =
    forecast.length === 1 ? forecast[0].currently : '';
  const searchResult = forecast.length >= 1 ? true : false;

  return searchResult ? (
    <WeatherCard
      summary={summary}
      city={city}
      state={state}
      temperature={Math.round(temperature)}
      latitude={latitude}
      longitude={longitude}
    />
  ) : (
    <div></div>
  );
};

export default SearchResult;
