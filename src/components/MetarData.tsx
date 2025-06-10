import { useState, useEffect } from 'react';

const MetarData = () => {
  const [metarData, setMetarData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetar = async () => {
      try {
        const response = await fetch('https://api.metarservice.com/metar?station=LTBD'); // Replace with a valid METAR API URL
        if (!response.ok) {
          throw new Error(`Error fetching METAR: ${response.statusText}`);
        }
        const data = await response.json();
        setMetarData(data.metar); // Adjust based on the API response structure
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetar();
  }, []);

  return (
    <div>
      <h2>METAR Data</h2>
      {loading && <p>Loading METAR data...</p>}
      {error && <p>Error: {error}</p>}
      {metarData && <p>{metarData}</p>}
    </div>
  );
};

export default MetarData;