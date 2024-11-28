export default function Countries() {
  const API = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) {
          console.error(`API Error: ${res.status} - ${res.statusText}`);
          return;
        }
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
    <div>
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          minHeight: "100vh",
        }}
      >
        {filteredCountries.length === 0 ? (
          <p>No countries to display. Please try again later.</p>
        ) : (
          filteredCountries.map((country) => (
            <CountryCards
              key={country.cca3}
              name={country.name.common}
              flagImg={country.flags.png}
              flagAlt={country.flags.alt || `Flag of ${country.name.common}`}
            />
          ))
        )}
      </div>
    </div>
  );
}