import React from "react";
import styled from "styled-components";
import {
  WiNightClear,
  WiDaySunny,
  WiRainMix,
  WiSnow,
  WiSleet,
  WiWindy,
  WiFog,
  WiCloudy
} from "react-icons/wi";
import { screenBreakpoints } from "./theme";

const WeatherIconContainer = styled.div`
  font-size: 20em;
  margin-right: 0.7em;
  display: flex;
  flex-direction: column;

  @media (max-width: ${screenBreakpoints.tablet}px) {
    font-size: 15em;
    margin-right: 0.5em;
  }

  @media (max-width: ${screenBreakpoints.small}px) {
    margin-right: 0em;
    margin-bottom: 0.2em;
  }
`;

const WeatherSummaryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${screenBreakpoints.small}px) {
    flex-direction: column;
  }
`;

const WeatherIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case "clear-day":
      return <WiDaySunny />;
    case "clear-night":
      return <WiNightClear />;
    case "rain":
      return <WiRainMix />;
    case "snow":
      return <WiSnow />;
    case "sleet":
      return <WiSleet />;
    case "wind":
      return <WiWindy />;
    case "fog":
      return <WiFog />;
    case "cloudy":
      return <WiCloudy />;
    case "partly-cloudy-day":
      return <WiCloudy />;
    case "partly-cloudy-night":
      return <WiCloudy />;

    default:
      console.error(
        "renderWeatherIcon could not handle the weather type. it recieved: " +
          type
      );
      // @Incomplete - should render something more appropriate
      return <WiCloudy />;
  }
};

const Forecast: React.FC<{
  city: string;
  country: string;
  icon: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  summary: string;
}> = ({ city, country, icon, temperature, humidity, windSpeed, summary }) => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "3em", fontWeight: "bold" }}>{city}</div>
        <div style={{ fontSize: "1.5em", color: "gray" }}>{country}</div>
      </div>
      <WeatherSummaryContainer>
        <WeatherIconContainer>
          <WeatherIcon type={icon} />
        </WeatherIconContainer>
        <div>
          <div style={{ fontWeight: "bold" }}>{summary}</div>
          <div>Temperature: {temperature + "\u00b0"}C</div>
          <div>Humidity: {humidity}%</div>
          <div>Wind speed: {windSpeed}mph</div>
        </div>
      </WeatherSummaryContainer>
    </div>
  );
};

export default Forecast;
