import { useState, useEffect } from 'react';
import SaveResult from '../../components/save-result';
import axios from 'axios';

const SavedWeather = ({ currentUser, locations }) => {
  const [data, setData] = useState([]);
  const [cityArray, setCityArray] = useState([]);
  const [stateArray, setStateArray] = useState([]);
  const [idArray, setIdArray] = useState([]);
  let index = -1;

  useEffect(() => {
    let calls = [];
    for (const location of locations) {
      const { latitude, longitude, city, state, id } = location;
      setCityArray((cityArray) => [...cityArray, city]);
      setStateArray((stateArray) => [...stateArray, state]);
      setIdArray((idArray) => [...idArray, id]);
      calls.push(
        axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.darkSkyKey}/${latitude},${longitude}`
        )
      );
    }

    axios.all(calls).then((responses) => {
      setData(responses);
    });
  }, []);

  const weatherList = data.map((forecast) => {
    index++;
    return (
      <SaveResult
        key={idArray[index]}
        forecast={forecast.data}
        city={cityArray[index]}
        state={stateArray[index]}
        id={idArray[index]}
      />
    );
  });

  return (
    <div>
      {weatherList.length === 0 ? (
        <p>
          You have no saved weather yet - search for locations and save your
          favorites!
        </p>
      ) : (
        <div>
          <h1 className="saved-title">Saved Location Weather</h1>
          <div className="saved-weather-container">{weatherList}</div>
        </div>
      )}
    </div>
  );
};

SavedWeather.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/locations/saved');

  return { locations: data };
};

export default SavedWeather;
