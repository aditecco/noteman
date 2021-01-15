/* ---------------------------------
Form
--------------------------------- */

import styled from "styled-components";
import {rem} from "../../util/utils";

export const Form = styled.form.attrs({ className: "Form" })`
  width: 100%;
  padding: 40px 20px;
  & > * + * {
    margin-top: ${rem(40)};
  }
`;
