// ToggleTheme.js
import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  margin-top: 10px;
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;

  &:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ToggleTheme = ({ handleThemeToggle }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    handleThemeToggle(newTheme);
  };

  return (
    <ToggleContainer>
      <Toggle>
        <input type="checkbox" onChange={toggleTheme} />
        <Slider></Slider>
      </Toggle>
    </ToggleContainer>
  );
};

export default ToggleTheme;
