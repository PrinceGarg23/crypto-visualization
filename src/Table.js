import React from "react";
import { Table } from "react-bootstrap";
import fetchCryptoData from "./fetchCryptoData";

const CryptoTable = ({data}) => {
  return (
    <div>
      <h2>Table</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dataPoint, index) => (
            <tr key={index}>
              <td>{dataPoint.date}</td>
              <td>{dataPoint.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CryptoTable;
