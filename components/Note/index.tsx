/* ---------------------------------
Note
--------------------------------- */

import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { ActionDef } from "/types";
import PageHeader from "../PageHeader";
import { INote } from "../../types";

type OwnProps = {
  note: INote | Record<string, unknown>; // TODO
  actions?: ActionDef[];
  className?: string;
};

const _Note: React.FC<OwnProps> = ({
  note,
  actions,
  children,
  className = "Note",
}) => {
  return (
    <article className={className}>
      <PageHeader
        title={note?.title}
        subtitle={
          "Created on: " + new Date(note?.published_at).toLocaleString()
        }
        actions={actions}
      />

      <ReactMarkdown className={"note-content"} source={note?.body} />

      {children}
    </article>
  );
};

export const Note = styled(_Note)`
  max-width: 800px;
  margin: 0 auto;
  min-height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius + "px"};
  background-color: white;
  box-shadow: 0 2px 30px 10px #00000014;

  .note-content {
    padding: 20px 30px 40px;
    line-height: 1.6;

    & > * {
      font-family: "IBM Plex Sans", sans-serif;
      font-weight: normal;
    }
  }
`;
