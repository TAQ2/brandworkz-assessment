import React from "react";
import { shallow, mount } from "enzyme";

import Form from "./Form";

it("renders without crashing", () => {
  const formProps = {
    handleSubmit: () => {},
    userInput: "Test",
    handleUserInput: () => {}
  };
  const wrapper = shallow(<Form {...formProps} />);
  expect(wrapper).toMatchSnapshot();
});

it("displays the user input in an <input /> and updates accordingly", () => {
  const formProps = {
    handleSubmit: () => {},
    userInput: "Test",
    handleUserInput: () => {}
  };
  const wrapper = mount(<Form {...formProps} />);
  expect(wrapper.find("input").instance().value).toEqual(formProps.userInput);

  // now update the userInput prop
  const newUserInput = "Different Test";
  wrapper.setProps({ ...formProps, userInput: newUserInput });
  expect(wrapper.find("input").instance().value).toEqual(newUserInput);
});

it("handleUserInput is called when the input onChange is called", () => {
  const spy = jest.fn();
  const formProps = {
    handleSubmit: () => {},
    userInput: "Test",
    handleUserInput: spy
  };
  const wrapper = mount(<Form {...formProps} />);

  const event = { target: { value: "event" } };
  wrapper.find("input").simulate("change", event);

  expect(spy).toBeCalledTimes(1);
  expect(spy).toBeCalledWith(expect.objectContaining(event));
});

it("handleSubmit is called when the button is clicked", () => {
  const spy = jest.fn();
  const formProps = {
    handleSubmit: spy,
    userInput: "Test",
    handleUserInput: () => {}
  };
  const wrapper = mount(<Form {...formProps} />);

  wrapper.find("button").simulate("click");
  expect(spy).toBeCalledTimes(1);
});
