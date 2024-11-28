import { useEffect, useState } from "react";

const CountryCards = ({ name, flagImg, flagAlt }) => {
  return (
    <div //// class name of countryCard as per requirment
      className="countryCard"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "10px",
        margin: "10px",
        border: "1px solid grey",
        borderRadius: "8px",
        width: "200px",
        height: "200px",
      }}
    >
      <img
        src={flagImg}
        alt={flagAlt}
        style={{ height: "100px", width: "100px" }}
      />
      <h2>{name}</h2>
    </div>
  );
};

export default function Countries() {
  const API = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch countries from the API
  useEffect(() => {
    /// api error handling and logging to the console
    const fetchCountries = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );

  return (
    /// input of type text according to requirment
    <div>
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for Countries ..."
          className="search-bar"
          style={{
            padding: "10px",
            fontSize: "14px",
            width: "50%",
            margin: "10px",
          }}
        />
      </div>

      {/* Country Cards Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px", // added gap for spacing between cards
          minHeight: "100vh",
        }}
      >
        {filteredCountries.map((country) => (
          <CountryCards
            key={country.cca3}
            name={country.name.common}
            flagImg={country.flags.png}
            flagAlt={country.flags.alt || `Flag of ${country.name.common}`}
          />
        ))}
      </div>
    </div>
  );
}
