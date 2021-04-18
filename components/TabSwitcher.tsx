/* ---------------------------------
TabSwitcher
--------------------------------- */

import React, { useState, ReactElement } from "react";
import styled from "styled-components";

type TabConfig = {
  name: string;
  content: ReactElement | React.FC | string;
};

interface TabSwitcherProps {
  tabs: TabConfig[];
  onTabSwitch?: () => void;
}

// StyledTabSwitcher
const StyledTabSwitcher = styled.div`
  padding: 1rem;

  .TabHeader {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 1rem;
    box-shadow: 0 1px 2px -1px #00000033;
  }

  .TabContent {
    display: block;

    > * {
      margin-top: 1rem;
    }
  }

  .TabButton {
    border: 0;
    outline: 1px solid #dddddd3b;
    border-top: 1px solid #ddd;
    background-color: transparent;
    padding: 10px 20px;
    opacity: 0.4;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &:hover {
      border-top: 3px solid rgba(white, 0.5);
      background-color: rgba(white, 0.5);
      opacity: 1;
    }

    + .TabButton {
      margin-left: 0.25rem;
    }

    &--selected {
      opacity: 1;
      border-top: 3px solid rebeccapurple;

      &:hover {
        background-color: rgba(white, 0.5);
      }
    }
  }
`;

// TabSwitcher
export default function TabSwitcher({
  tabs,
  onTabSwitch,
}: TabSwitcherProps): ReactElement {
  const [selected, setSelected] = useState(0);

  function handleTabSwitch(tab: number) {
    return function () {
      setSelected(tab);

      onTabSwitch && onTabSwitch();
    };
  }

  return (
    <StyledTabSwitcher>
      <div className="TabHeader">
        {tabs.map((tab, k) => (
          <button
            key={k}
            type="button"
            className={`TabButton ${
              selected === k ? "TabButton--selected" : ""
            }`}
            onClick={handleTabSwitch(k)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="TabContent">{tabs[selected]["content"]}</div>
    </StyledTabSwitcher>
  );
}
