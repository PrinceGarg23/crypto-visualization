// CryptoSelect.js
import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  margin-top: 10px;
  padding: 8px;
  font-size: 14px;
`;

const CryptoSelect = ({ selectedCrypto, handleCryptoChange }) => {
  return (
    <Select value={selectedCrypto} onChange={handleCryptoChange}>
      <option value="bitcoin">Bitcoin</option>
      <option value="ethereum">Ethereum</option>
      <option value="ripple">Ripple</option>
      {/* Add more cryptocurrencies here */}
    </Select>
  );
};

export default CryptoSelect;
