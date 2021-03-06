/* ---------------------------------
Logo
--------------------------------- */

import React from "react";
import styled from "styled-components";
import { MaterialIcon } from "../MaterialIcon";

const LogoContainer = styled.div.attrs({ className: "LogoContainer" })`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;

  > .logotype,
  > .material-icons {
    color: rebeccapurple;
  } // TODO 'accent' var

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
      <MaterialIcon>article</MaterialIcon>
      <span className="logotype">NoteMan</span>
    </LogoContainer>
  );
};

export default Logo;
