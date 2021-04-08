/* ---------------------------------
Input
--------------------------------- */

import styled from "styled-components";
import { rem } from "../../util";

export const Input = styled.input.attrs({ className: "Input" })`
  width: 100%;
  padding: 10px;
  font-size: ${rem(18)};
  color: #555;
  border-radius: 4px;
  border: 2px solid transparent;
  outline: 0;
  background-color: whitesmoke;
  font-family: inherit;

  &:focus {
    border: 2px solid rebeccapurple;
    outline: 0;
  }
`;
