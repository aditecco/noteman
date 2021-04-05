/* ---------------------------------
SecondaryText
--------------------------------- */

import styled from "styled-components";
import { rem } from "../../util";

export const SecondaryText = styled.span.attrs({ className: "SecondaryText" })`
  font-size: ${rem(14)};
  color: lightslategray;
`;
