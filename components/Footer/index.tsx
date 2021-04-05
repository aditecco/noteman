/* ---------------------------------
Footer
--------------------------------- */

import styled from "styled-components";

export const Footer = styled.footer.attrs({ className: "Footer" })`
  display: flex;
  padding: 12px 30px;
  background-color: white;
  z-index: 1;
  border: 0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: 1px solid #eee;

  & > button:last-child {
    margin-left: 16px;
  }
`;
