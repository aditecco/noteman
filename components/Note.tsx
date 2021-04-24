/* ---------------------------------
Note
--------------------------------- */

import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import PageHeader from "./PageHeader";
import { Notes, UsersPermissionsUser } from "../types";
import { ActionDef } from "../types";

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
        subtitle={`@${new Date(note?.published_at).toLocaleString()}, by ${
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
  // NOTE
  // these styles need to be synced with those in components/ContentEditor/index.tsx
  // TODO converge to single component
  max-width: 800px;
  margin: 0 auto;
  min-height: 100%;

  .note-content {
    padding: 1rem 0;
    line-height: 1.6;
    color: #5e5e5e;

    & > * {
      font-family: "Karla", sans-serif;
      font-weight: normal;
    }
  }
`;
