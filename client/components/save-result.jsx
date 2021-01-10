import SaveCard from './save-card';

const SaveResult = ({ forecast, city, state, id }) => {
  const { summary, temperature } = forecast.currently;

  return (
    <SaveCard
      summary={summary}
      city={city}
      state={state}
      temperature={Math.round(temperature)}
      id={id}
    />
  );
};

export default SaveResult;
