/* ---------------------------------
Spinner
--------------------------------- */

import React, { ReactElement } from "react";
import styled from "styled-components";

interface OwnProps {
  inline?: boolean;
  color?: string;
  duration?: string;
  shadow?: string;
  className?: string;
}

// Spinner
const _Spinner: React.FC<OwnProps> = ({
  className = "SpinnerContainer",
}): ReactElement => (
  <div className={className}>
    <div className="Spinner" />
  </div>
);

export const Spinner = styled(_Spinner)`
  // custom animation
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  // styles
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  ${props =>
    props.inline
      ? `
  position: static;
  width: 100%;
  height: 100%;
  `
      : `
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  `}

  .Spinner {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 7px solid ${({ theme }) => theme.alternateFontColorLight01};
    border-top-color: ${({ theme }) => theme.accent01};
    box-shadow: 0 2px 40px #00000017;
    background-color: transparent;
    //  TODO make color, duration, shadow customizable

    /*
      longhand:

      animation-duration
      animation-timing-function
      animation-delay
      animation-iteration-count
      animation-direction
      animation-fill-mode
      animation-play-state
      animation-name
    */

    animation: 900ms infinite spin;
  }
`;
