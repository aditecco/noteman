/* ---------------------------------
ContentEditor
--------------------------------- */

import React from "react";
import styled from "styled-components";
import PageHeader from "../PageHeader";
import {INote} from "../../types";

type OwnProps = {
  note?: INote | Record<string, unknown>;
  createMode?: boolean;
  className?: string;
};

const _ContentEditor: React.FC<OwnProps> = ({
  note,
  children,
  className = "ContentEditor",
}) => {
  return (
    <article className={className}>
      <PageHeader
        title={note ? "✍️ Editing: " + note?.title ?? "" : "📓 Create a note"}
        subtitle={""}
      />

      {children}
    </article>
  );
};

export const ContentEditor = styled(_ContentEditor)`
  max-width: 800px;
  margin: 0 auto;
  min-height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius + " px"};
  background-color: white;
  box-shadow: 0 2px 30px 10px #00000014;
`;
