import { useState, useEffect } from 'react';

interface MetarDataProps {
  station: string; // Pass the station code as a prop
}

const MetarData: React.FC<MetarDataProps> = ({ station }) => {
  const [metarData, setMetarData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetar = async () => {
    try {
      const url = `http://localhost:5000/metar/${station}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching METAR: ${response.statusText}`);
      }
      const data = await response.json();
      setMetarData(data.metar);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetar();
  }, [station]);

  return (
    <div>
      <h2>METAR Data for {station}</h2>
      {loading && <p>Loading METAR data...</p>}
      {error && <p>Error: {error}</p>}
      {metarData && <pre>{metarData}</pre>} {/* Display METAR data in a preformatted block */}
    </div>
  );
};

export default MetarData;