/* ---------------------------------
Layout
--------------------------------- */

import styled from "styled-components";

type OwnProps = {
  marginTop?: number;
};

export const Layout = styled.div.attrs({ className: "Layout" })<OwnProps>`
  height: ${props => "calc(100vh - " + (props.marginTop || 0) + "px )"};
  margin-top: ${props => (props.marginTop || 0) + "px"};
  //display: flex;
  //flex-flow: column nowrap;
  //align-items: stretch;
`;
