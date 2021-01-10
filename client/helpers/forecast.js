import axios from 'axios';

const getForecast = async (lat, lng) => {
  const res = await axios.get(
    `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.FORECAST_KEY}/${lat},${lng}`
  );

  return res.data;
};

export default getForecast;
