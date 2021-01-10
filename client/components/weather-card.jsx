import { useState } from 'react';
import useRequest from '../hooks/use-request';
import Fade from 'react-bootstrap/Fade';

const WeatherCard = ({
  summary,
  city,
  state,
  temperature,
  latitude,
  longitude,
}) => {
  const [open, setOpen] = useState(false);
  const { doRequest, errors } = useRequest({
    url: '/api/locations',
    method: 'post',
    body: {
      latitude,
      longitude,
      city,
      state,
    },
    onSuccess: () => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    },
  });

  const img = [
    summary === 'Clear' && { href: '/clear.png' },
    summary === 'Cloudy' && { href: '/cloudy.png' },
    summary === 'Mostly Cloudy' && { href: '/cloudy.png' },
    summary === 'Overcast' && { href: '/cloudy.png' },
    summary === 'Possible Drizzle' && { href: '/cloudy.png' },
    summary === 'Partly Cloudy' && { href: '/partly-cloudy.png' },
    summary === 'Rain' && { href: '/rain.png' },
    summary === 'Drizzle' && { href: '/rain.png' },
    summary === 'Snow' && { href: '/snow.png' },
  ]
    .filter((imgConfig) => imgConfig)
    .map(({ href }) => {
      return href;
    });

  const onClick = (event) => {
    event.preventDefault();

    doRequest();
  };

  return (
    <div className="card w-25 text-center">
      <img
        src={img}
        className="card-img-top mx-auto d-block"
        alt="weather-icon"
        width="100"
      />
      <div className="card-body">
        <h1 className="card-title">{temperature}&#8457;</h1>
        <h5 className="card-text">
          {city}, {state}
        </h5>
        <p className="card-text">{summary}</p>
        <button className="btn btn-primary" onClick={onClick}>
          Save
        </button>
        <div>{errors}</div>
        <Fade in={open}>
          <div className="save-message">Saved!</div>
        </Fade>
      </div>
    </div>
  );
};

export default WeatherCard;
