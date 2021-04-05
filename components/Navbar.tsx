/* ---------------------------------
Navbar
--------------------------------- */

import styled from "styled-components";

export const Navbar = styled.nav.attrs({ className: "Navbar" })`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: white;
  background-color: #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.1);
  padding: 6px 18px;
`;
