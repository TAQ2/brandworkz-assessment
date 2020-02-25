import React, { useState } from "react";

import styled from "styled-components";

import { getGeocode, getDarksky } from "./requests";
import { colours, screenBreakpoints } from "./theme";
import Forecast from "./Forecast";
import Form from "./Form";
import { convertToF } from "./utils";

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: ${colours.primary};
  text-align: center;

  @media (max-width: ${screenBreakpoints.tablet}px) {
    font-size: 3.5rem;
  }

  @media (max-width: ${screenBreakpoints.small}px) {
    font-size: 3rem;
  }
`;

const AppContainer = styled.div`
  max-width: ${screenBreakpoints.maxContentWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Loading: React.FC = () => <div>Loading</div>;

export const Error: React.FC = () => (
  <div>Sorry, something went wrong. Please try refreshing the page.</div>
);

export const NoResults: React.FC = () => (
  <div style={{ textAlign: "center" }}>
    Sorry, no results were found. Check your spelling!
  </div>
);

type WeatherDataType = {
  country: string;
  city: string;
  icon: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  summary: string;
};

const App: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);

  const [noResult, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleUserInput = (e: React.FormEvent<HTMLInputElement>) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    setNoResults(false);
    setIsLoading(true);
    setWeatherData(null); // removes any previous forecast if the user searches again

    try {
      const geocodeResponse = await getGeocode(encodeURI(userInput));

      if (geocodeResponse.data.hasOwnProperty("error")) {
        setNoResults(true);
      } else {
        const darkSkyResponse = await getDarksky(
          geocodeResponse.data.latt,
          geocodeResponse.data.longt
        );

        if (darkSkyResponse != null) {
          setUserInput("");
          setWeatherData({
            country: geocodeResponse.data.standard.countryname,
            city: geocodeResponse.data.standard.city,
            icon: darkSkyResponse.data.currently.icon,
            temperature: convertToF(darkSkyResponse.data.currently.temperature),
            humidity: darkSkyResponse.data.currently.humidity * 100, // * 100 to convert from ratio to percentage
            windSpeed: darkSkyResponse.data.currently.windSpeed,
            summary: darkSkyResponse.data.currently.summary
          });
        }
      }
      setIsLoading(false);
    } catch (error) {
      setNoResults(false);
      setWeatherData(null);
      setIsLoading(false);
      setIsError(true);
    }
  };

  if (isError) {
    return <Error />;
  }

  return (
    <AppContainer>
      <Title>Weather Watchers</Title>
      <Form
        handleSubmit={handleSubmit}
        userInput={userInput}
        handleUserInput={handleUserInput}
      />
      {noResult && <NoResults />}
      {isLoading && <Loading />}
      {weatherData != null && (
        <Forecast
          city={weatherData.city}
          country={weatherData.country}
          icon={weatherData.icon}
          temperature={weatherData.temperature}
          humidity={weatherData.humidity}
          windSpeed={weatherData.windSpeed}
          summary={weatherData.summary}
        />
      )}
    </AppContainer>
  );
};

export default App;
