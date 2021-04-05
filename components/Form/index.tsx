/* ---------------------------------
Form
--------------------------------- */

import styled from "styled-components";
import { rem } from "../../util";

export const Form = styled.form.attrs({ className: "Form" })`
  width: 100%;
  padding: 40px 0;
  & > * + * {
    margin-top: ${rem(40)};
  }
`;
