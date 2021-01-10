import { useState } from 'react';

const SearchForm = ({ onSubmit }) => {
  const [location, setLocation] = useState('');

  return (
    <div>
      <form
        className="search-form"
        onSubmit={(event) => onSubmit(event, location)}
      >
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control form-group"
            placeholder="Search for a location"
            aria-label="Search for a location"
            aria-describedby="button-addon2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            id="button-addon2"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
