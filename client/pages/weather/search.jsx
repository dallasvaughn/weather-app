import { useState } from 'react';
import geocode from '../../helpers/geocode';
import getForecast from '../../helpers/forecast';
import SearchForm from '../../components/search-form';
import SearchResult from '../../components/search-result';
import Fade from 'react-bootstrap/Fade';

const Search = () => {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('');
  const [st, setSt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchForecast = async (location) => {
    try {
      const { lat, lng, long_name, short_name } = await geocode(location);
      const forecastResult = await getForecast(lat, lng);
      setForecast([forecastResult]);
      setCity(long_name);
      setSt(short_name);
      setError(null);
    } catch (err) {
      setError(<div>Could not get weather for this location</div>);
    }
  };

  const onSubmit = async (event, location) => {
    setOpen(false);
    setLoading(true);
    event.preventDefault();
    await fetchForecast(location);
    setLoading(false);
    setOpen(true);
  };

  return (
    <div>
      <SearchForm onSubmit={onSubmit} />
      {loading ? (
        <div className="spinner-container">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <div></div>
      )}
      <Fade in={open}>
        <div className="search-result-container">
          <SearchResult forecast={forecast} city={city} state={st} />
          {error}
        </div>
      </Fade>
    </div>
  );
};

export default Search;
