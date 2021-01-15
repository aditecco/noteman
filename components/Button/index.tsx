/* ---------------------------------
Button
--------------------------------- */

import styled from "styled-components";
import {rem} from '../../util/utils'

type SizeVariants = "small" | "medium";

type OwnProps = {
  variant?: SizeVariants;
  accent?: string;
  color?: string;
};

// Button
export const Button = styled.button.attrs({
  className: "Button",
})<OwnProps>`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  outline: none;
  border: none;
  padding: ${props => (props.variant !== "small" ? "12px 6px" : "8px 6px")};
  border-radius: 4px;
  color: ${props => props.color || props.theme.alternateFontColorLight01};
  background-color: ${props => props.accent || props.theme.accent01};
  border: 2px solid transparent;
  font-size: ${rem(16)};
  align-self: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  min-width: ${props => {
    switch (props.variant) {
      case "small":
        return rem(100);

      case "medium":
        return rem(120);

      default:
        return rem(140);
    }
  }};

  > .material-icons {
    font-size: ${rem(20)};
  }

  &:hover {
    background-color: darkslateblue;
    color: white;
  }
`;

// SecondaryButton
export const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 2px solid ${props => props.color ?? props.theme.accent01};
  color: ${props => props.color ?? props.theme.accent01};
`;
