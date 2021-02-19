/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';


function WeatherDisplay(props) {
  const styles = css`
    display: inline-block;
    border: 5px solid white;
    padding: 10px;
    margin: 10px;
    list-style-type: none;
    align-items: center;
    min-width: 400px;
    background-image: url("https://image.freepik.com/free-photo/blue-sky-with-cloud-clean-energy-power-clear-weather-background_43284-844.jpg");
    color: white;
    img {
      width: 100px;
      background: lightblue;
      text-align: center;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    p {
      text-align: center;
    }
  `;



  return (
    <div css={styles}>
      <img src={props.icon}/>
      <p>Date: {props.date}</p>
      <p>Feels like: {props.feelslike} &deg;C</p>
      <p>Minimum Temperature: {props.minTemp.toFixed(1)} &deg;C</p>
      <p>Maximum Temperature: {props.maxTemp.toFixed(1)} &deg;C</p>
      <p>Forecast: {props.forecast.toUpperCase()}</p>
    </div>
  );
}

export default WeatherDisplay;
