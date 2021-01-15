/* ---------------------------------
TextArea
--------------------------------- */

import styled from "styled-components";
import { rem } from "../../../utils";

export const TextArea = styled.textarea.attrs({ className: "TextArea" })`
  width: 100%;
  padding: 10px;
  font-size: ${rem(18)};
  color: #555;
  border: 0;
  border-radius: 4px;
  background-color: whitesmoke;
  font-family: inherit;
  border: 2px solid transparent;

  &:focus {
    border: 2px solid rebeccapurple;
  }
`;
