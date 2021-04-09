/* ---------------------------------
ContentEditor
--------------------------------- */

import React from "react";
import styled from "styled-components";
import PageHeader from "../PageHeader";
import { Notes } from "../../types";

type OwnProps = {
  note?: Notes | Record<string, unknown>;
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
  // NOTE
  // these styles need to be synced with those in components/Note/index.tsx
  max-width: 800px;
  margin: 0 auto;
  min-height: 100%;
  color: #5e5e5e;
`;
