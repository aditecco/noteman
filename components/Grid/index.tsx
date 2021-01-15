/* ---------------------------------
Grid
--------------------------------- */

import styled from "styled-components";

type OwnProps = {
  cols: string;
  gap?: string;
  height?: string;
};

export const Grid = styled.div.attrs({ className: "Grid" })<OwnProps>`
  display: grid;
  grid-template-columns: ${props => props.cols};
  grid-gap: ${props => props.gap || "20px"};
  height: ${props => props.height || "auto"};

  > * {
    height: 100%;
    overflow-y: auto;
  }
`;
