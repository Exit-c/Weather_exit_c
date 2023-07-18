import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  width: 500px;
  color: #333;
  background-color: #f4fafc;
  padding: 10px 0;
  margin-bottom: 20px;
  border-radius: 20px;
  ul {
    padding-left: 20px;
  }
  li:first-child {
    font-size: 25px;
  }
  li:nth-child(2) {
    font-size: 30px;
  }
  li:nth-child(4) {
    font-size: 20px;
    margin-top: 10px;
  }
`;

const WeatherBox = ({ weather }) => {
  return (
    <StyledBox>
      <ul>
        <li>{weather?.name}</li>
        <li>{`${Math.round(weather?.main.temp)}° / ${(
          weather?.main.temp * 1.8 +
          32
        ).toFixed(2)}`}</li>
        <li>{`최저 ${Math.round(weather?.main.temp_min)}° / 최고 ${Math.round(
          weather?.main.temp_max
        )}°`}</li>
        <li>{weather?.weather[0].description}</li>
      </ul>
    </StyledBox>
  );
};

export default WeatherBox;
