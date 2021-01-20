/* ---------------------------------
PageHeader
--------------------------------- */

import React from "react";
import styled from "styled-components";
import {Heading} from "../Heading";
import {ActionDef} from "../../types";
import {SecondaryButton} from "../Button";

type OwnProps = {
  title: string;
  subtitle?: string;
  actions?: ActionDef[];
  className?: string;
};

const _PageHeader: React.FC<OwnProps> = ({
  title,
  subtitle,
  actions,
  // we don't really need a customizable className,
  // but a className must be passed in order to link
  // to the styled sub-component
  // https://stackoverflow.com/questions/52542817/styled-components-not-applying-style-to-custom-functional-react-component
  className = "PageHeader",
}) => {
  return (
    <header className={className}>
      <div className="page-header-inner">
        <div className="page-header-meta">
          <Heading thinMargin>{title}</Heading>

          {subtitle && (
            <span className={"page-header-subheading"}>{subtitle}</span>
          )}
        </div>

        <div className="page-header-toolbar">
          {actions?.map((action, i) => (
            <SecondaryButton
              variant={"small"}
              onClick={action?.callback}
              key={"action_" + i}
            >
              <>
                {action?.icon && (
                  <div className="material-icons">{action?.icon}</div>
                )}

                {action?.name}
              </>
            </SecondaryButton>
          ))}
        </div>
      </div>
    </header>
  );
};

const PageHeader = styled(_PageHeader)`
  border-bottom: ${({ theme }) => "1px solid " + theme.stroke01};

  .page-header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    margin-top: -2px;
  }

  .page-header-meta {
    .page-header-subheading {
      color: ${({ theme }) => theme.alternateFontColorDark01};
    }
  }

  .page-header-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > * {
      & + * {
        margin-left: 10px;
      }
    }
  }
`;

export default PageHeader;