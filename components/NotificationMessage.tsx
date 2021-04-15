/* ---------------------------------
NotificationMessage
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { MaterialIcon } from "./MaterialIcon";
import classNames from "classnames";

type OwnProps = {
  className?: string;
  enabled: boolean;
  icon: string;
  message: string;
  timeout?: number;
  variant?: "light";
};

function _NotificationMessage({
  className = "NotificationMessage",
  enabled,
  icon,
  message,
  timeout = 2000,
}: PropsWithChildren<OwnProps>): ReactElement | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (enabled) {
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, timeout);
    }
  }, [enabled]);

  return visible ? (
    <div className={classNames([className, visible && "visible"])}>
      {icon && (
        <div className="visual">
          <MaterialIcon>{icon}</MaterialIcon>
        </div>
      )}

      <div className="content">{message}</div>
    </div>
  ) : null;
}

export const NotificationMessage = styled(_NotificationMessage)<OwnProps>`
  position: fixed;
  right: 20px;
  top: -999px;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  box-shadow: 0 2px 20px 20px rgba(0, 0, 0, 0.1);
  transition: top 0.3s ease-in-out;
  color: whitesmoke;
  z-index: 5;

  > * {
    display: inline-block;
  }

  &.visible {
    top: 20px;
  }

  ${props => {
    if (props.variant === "light") {
      return `
    background-color: whitesmoke;
    color: ${props.theme.alternateFontColorDark01};
    border-top: 4px solid ${props.theme.accent01};
    border-radius: ${props.theme.borderRadius};
      `;
    }
  }}

  .visual {
    vertical-align: middle;

    i.material-icons {
      color: ${({ theme }) => theme.accent01};
      font-size: 1.3rem;
    }

    + .content {
      margin-left: 10px;
    }
  }

  .content {
  }
`;
