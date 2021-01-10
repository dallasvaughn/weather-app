import axios from 'axios';

const geocode = async (location) => {
  const locationQuery = location.replace(/\s+/g, '+'); // replace spaces in user input with '+' for search parameter

  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${locationQuery}&key=${process.env.GEOCODE_KEY}`
  );

  const { lat, lng } = res.data.results[0].geometry.location;
  const { long_name } = res.data.results[0].address_components[0];
  const { short_name } = res.data.results[0].address_components[2];

  return { lat, lng, long_name, short_name };
};

export default geocode;
