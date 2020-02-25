import axios from "axios";

export const getGeocode = (searchText: string) =>
  axios.get(`https://geocode.xyz/${searchText}?json=1`);

export const getDarksky = (lat: number, lng: number) =>
  axios.get(`/darksky?lat=${lat}&lng=${lng}`);
