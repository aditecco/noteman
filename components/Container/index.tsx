/* ---------------------------------
Container
--------------------------------- */

import styled from "styled-components";

type OwnProps = {
  maxWidth?: number;
};

export const Container = styled.div.attrs({ className: "Container" })<OwnProps>`
  max-width: ${props => (props.maxWidth ? props.maxWidth + "px" : "600px")};
  margin: 0 auto;
`;
