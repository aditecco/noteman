/* ---------------------------------
Note
--------------------------------- */

import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import PageHeader from "../PageHeader";
import { Notes, UsersPermissionsUser } from "../../types";
import { ActionDef } from "../../types/UI";

type OwnProps = {
  note: Partial<Notes>;
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
        subtitle={`Created on ${new Date(
          note?.published_at
        ).toLocaleString()} by ${
          (note?.author as UsersPermissionsUser)?.username
        }`}
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
  background-color: white;

  .note-content {
    line-height: 1.6;

    & > * {
      font-family: "IBM Plex Sans", sans-serif;
      font-weight: normal;
    }
  }
`;
