import React from "react";
import { shallow, mount } from "enzyme";

import Forecast from "./Forecast";

it("renders without crashing", () => {
  const forecastProps = {
    city: "test city",
    country: "test country",
    temperature: 111,
    humidity: 222,
    windSpeed: 333,
    summary: "test summar ",
    icon: "cloudy"
  };
  const wrapper = shallow(<Forecast {...forecastProps} />);
  expect(wrapper).toMatchSnapshot();
});

it("renders all the props in the component", () => {
  const forecastProps = {
    city: "test city",
    country: "test country",
    temperature: 111,
    humidity: 222,
    windSpeed: 333,
    summary: "test summar "
  };

  // add icon separately because we do not render this prop
  const icon = "cloudy";
  const wrapper = mount(<Forecast {...forecastProps} icon={icon} />);

  Object.values(forecastProps).forEach(prop => {
    expect(wrapper.text().includes(String(prop))).toEqual(true);
  });
});
