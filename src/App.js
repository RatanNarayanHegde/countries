import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  // console.log(country);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      // console.log(countries);
    }, []);
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const countriesToDisplay = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter)
  );

  return (
    <div>
      <label>find countries</label>
      <input value={filter} onChange={handleFilterChange} />
      {countriesToDisplay.length > 10 ? (
        <p>Too many countries to display </p>
      ) : countriesToDisplay.length == 1 ? (
        <Country country={countriesToDisplay[0]} />
      ) : (
        <div>
          {countriesToDisplay.map((country) => (
            <div key={country.name.common}>
              <span>{country.name.common} </span>
              <button
                onClick={() => setFilter(country.name.common.toLowerCase())}
              >
                Show
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
