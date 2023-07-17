import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const WeatherButton = ({ cities, city, handleCityChange }) => {
  const StyledBox = styled.div`
    width: 500px;
    overflow: hidden;
    Button {
      float: left;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  `;
  return (
    <StyledBox>
      {/* variant="outline-primary"는 bootstrap이 이미 만들어 놓은 button 종류 중 하나 */}
      <Button
        variant={city === '' ? 'primary' : 'outline-primary'}
        onClick={() => {
          handleCityChange('current');
        }}
      >
        Current Location
      </Button>

      {cities.map((item, index) => (
        <Button
          variant={city === item ? 'primary' : 'outline-primary'}
          key={index}
          onClick={() => {
            handleCityChange(item);
          }}
        >
          {item}
        </Button>
      ))}
    </StyledBox>
  );
};

export default WeatherButton;
