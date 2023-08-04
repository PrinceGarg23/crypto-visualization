import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import CryptoTable from "./Table";

const App = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Crypto Data Visualization</h1>
      <LineChart />
      <BarChart />
      <PieChart /> {/* Add the PieChart component */}
      <CryptoTable />
    </div>
  );
};

export default App;
