import axios from 'axios';

const getForecast = async (lat, lng) => {
  const res = await axios.get(
    `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.darkSkyKey}/${lat},${lng}`
  );

  return res.data;
};

export default getForecast;
