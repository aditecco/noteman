/* ---------------------------------
List, ListItem
--------------------------------- */

import styled from "styled-components";
import {rem} from "../../util/utils";

// List
export const List = styled.ul.attrs({ className: "List" })`
  list-style: none;
  padding-left: 0;
  margin-bottom: 80px;
`;

// ListItem
export const ListItem = styled.li.attrs({ className: "ListItem" })`
  //margin: 4px 0;
  font-size: ${rem(15)};
  color: #444;
  border-left: 4px solid transparent;

  & > * {
  }

  & + & {
    border-top: 1px solid lightgray;
  }

  &.selected {
    border-left: 4px solid rebeccapurple;
  }
`;
