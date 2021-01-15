/* ---------------------------------
Footer
--------------------------------- */

import styled from "styled-components";

export const Footer = styled.footer.attrs({ className: "Footer" })`
  display: flex;
  padding: 12px 30px;
  background-color: white;
  z-index: 1;
  box-shadow: 0 0px 30px 15px rgb(0 0 0 / 10%);
  border: 0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: 1px solid #eee;
  box-shadow: -10px 40px 0px #00000017;

  & > button:last-child {
    margin-left: 16px;
  }
`;
