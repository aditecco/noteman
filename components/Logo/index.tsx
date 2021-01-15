/* ---------------------------------
Logo
--------------------------------- */

import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div.attrs({ className: "LogoContainer" })`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;

  > .logotype {
    margin-left: 6px;
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 17px;
    letter-spacing: 0.5px;
  }
`;

const Logo: React.FC = () => {
  return (
    <LogoContainer>
      <i className="material-icons">article</i>
      <span className="logotype">PlainNotes</span>
    </LogoContainer>
  );
};

export default Logo;
