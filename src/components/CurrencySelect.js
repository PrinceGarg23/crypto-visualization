// CurrencySelect.js
import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  margin-top: 10px;
  padding: 8px;
  font-size: 14px;
`;

const CurrencySelect = ({ selectedCurrency, handleCurrencyChange }) => {
  return (
    <Select value={selectedCurrency} onChange={handleCurrencyChange}>
      <option value="usd">USD</option>
      <option value="eur">EUR</option>
      <option value="gbp">GBP</option>
      {/* Add more currencies here */}
    </Select>
  );
};

export default CurrencySelect;
