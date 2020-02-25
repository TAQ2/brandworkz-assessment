import React from "react";
import { GoSearch } from "react-icons/go";
import styled from "styled-components";

import { colours, screenBreakpoints } from "./theme";

export const Input = styled.input`
  width: 400px;
  padding: 0.5em;
  font-weight: bold;
  font-size: 1em;
  border: none;

  @media (max-width: ${screenBreakpoints.tablet}px) {
    width: 300px;
  }

  @media (max-width: ${screenBreakpoints.small}px) {
    width: 225px;
  }
`;

const Form: React.FC<{
  handleUserInput: (e: React.FormEvent<HTMLInputElement>) => void;
  userInput: string;
  handleSubmit: () => void;
}> = ({ handleUserInput, userInput, handleSubmit }) => {
  return (
    <div
      style={{
        marginBottom: "3em",
        display: "inline-block",
        border: `1px solid ${colours.primary}`
      }}
    >
      <Input
        onChange={handleUserInput}
        value={userInput}
        placeholder="Type a city"
      />
      <button
        onClick={handleSubmit}
        style={{
          fontSize: "1em",
          padding: "0.5em",
          border: "none",
          cursor: "pointer",
          outline: "0"
        }}
      >
        <GoSearch />
      </button>
    </div>
  );
};

export default Form;
