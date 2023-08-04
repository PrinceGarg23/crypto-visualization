// TimeframeSelect.js
import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  margin-top: 10px;
  padding: 8px;
  font-size: 14px;
`;

const TimeframeSelect = ({ selectedTimeframe, handleTimeframeChange }) => {
  return (
    <Select value={selectedTimeframe} onChange={handleTimeframeChange}>
      <option value="1">1 Day</option>
      <option value="7">1 Week</option>
      <option value="30">1 Month</option>
      {/* Add more timeframes here */}
    </Select>
  );
};

export default TimeframeSelect;
