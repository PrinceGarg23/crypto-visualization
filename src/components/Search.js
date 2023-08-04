// Search.js
import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <SearchBar
        type="text"
        placeholder="Search for a cryptocurrency..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
