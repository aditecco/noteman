/* ---------------------------------
AuthForm
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { Form } from "./Form";
import { Input } from "./Input";
import { Button } from "./Button";

export type FieldConfig = {
  name: string;
  placeholder?: string;
  type?: string;
  value: string;
};

type OwnProps = {
  fields: FieldConfig[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitLabel: string;
  handleSubmit: React.FormEventHandler;
};

export default function AuthForm({
  fields,
  handleChange,
  handleSubmit,
  submitLabel,
}: PropsWithChildren<OwnProps>): ReactElement | null {
  return (
    <Form onSubmit={handleSubmit}>
      {fields?.map?.((field, i) => (
        <Input
          key={i}
          type={field?.type ?? "text"}
          name={field?.name}
          placeholder={field?.placeholder}
          value={field?.value}
          onChange={handleChange}
        />
      ))}

      <Button type={"submit"}>{submitLabel}</Button>
    </Form>
  );
}
