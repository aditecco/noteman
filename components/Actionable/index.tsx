/* ---------------------------------
Actionable
--------------------------------- */

import styled from "styled-components";

export const Actionable = styled.a.attrs({ className: "Actionable" })`
  display: block;
  padding: 16px 20px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  & > * {
    display: block;
  }

  & > .title {
    text-transform: capitalize;
    /* font-weight: 700; */
  }

  & > .timestamp {
    margin-top: 8px;
    color: lightslategray;
    font-size: small;
  }

  &:hover {
    background-color: white;
  }
`;
