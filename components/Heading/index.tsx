/* ---------------------------------
Heading
--------------------------------- */

import styled from "styled-components";
import { rem } from "../../util";

type OwnProps = {
  thinMargin?: boolean;
  align?: "center" | "left" | "right";
};

export const Heading = styled.h3.attrs({ className: "Heading" })<OwnProps>`
  font-size: ${rem(28)};
  margin: ${rem(16)} 0 ${rem(20)};
  margin: ${props => props.thinMargin && "6px 0"};
  text-transform: capitalize;
  text-align: ${props => props.align || "left"};
  font-family: "Karla", sans-serif;
  font-weight: normal;
`;
