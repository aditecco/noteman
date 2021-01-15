/* ---------------------------------
Navbar
--------------------------------- */

import styled from "styled-components";
import { rem } from "../../../utils";

export const Navbar = styled.nav.attrs({ className: "Navbar" })`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: white;
  background-color: rebeccapurple;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 20px 6px rgba(0, 0, 0, 0.2);
  padding: 6px 18px;
`;
