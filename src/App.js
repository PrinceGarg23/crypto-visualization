import React, { useState, useEffect } from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import CryptoTable from "./Table";
import fetchCryptoData from "./fetchCryptoData"; // Update the import

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCryptoData();
        setCryptoData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Crypto Data Visualization</h1>
      {isLoading ? (
        <div>Loading data...</div>
      ) : (
        <>
          <LineChart data={cryptoData} />
          <BarChart data={cryptoData} />
          <PieChart data={cryptoData} />
          <CryptoTable data={cryptoData} />
        </>
      )}
    </div>
  );
};

export default App;
