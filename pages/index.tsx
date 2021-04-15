/* ---------------------------------
Index (Auth)
--------------------------------- */

import * as React from "react";
import { ReactElement, useState } from "react";
import { Heading } from "../components/Heading";
import { Container } from "../components/Container";
import TabSwitcher from "../components/TabSwitcher";
import { Layout } from "../components/Layout";
import Header from "../components/Header";
import { useAppDispatch } from "../hooks";
import AuthForm, { FieldConfig } from "../components/AuthForm";
import { signInUser, signUpUser } from "../state/auth/thunks";
import useAuthToken from "../hooks/useAuthToken";
import { Spinner } from "../components/Spinner/Spinner";
import { NotificationMessage } from "../components/NotificationMessage";

export default function Index(): ReactElement | null {
  // state
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // hooks
  const dispatch = useAppDispatch();
  const { loading, error } = useAuthToken();

  // ...
  const FIELDS: FieldConfig[] = [
    {
      value: identifier,
      placeholder: "email@example.com or username",
      name: "identifier",
      // type: "email",
    },
    {
      value: password,
      placeholder: "password",
      name: "password",
      type: "password",
    },
  ];

  // handleChange
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e?.target?.name === "identifier") {
      setIdentifier(e.target.value);
    }

    //
    else if (e?.target?.name === "password") {
      setPassword(e.target.value);
    }

    //
    else return;
  }

  // resetFields
  function resetFields() {
    setIdentifier("");
    setPassword("");
  }

  // handleSubmit
  function handleSubmit(intent: string) {
    return async function (e: React.FormEvent) {
      e?.preventDefault?.();

      // TODO display an error msg
      if (!identifier || !password) return;

      const creds = { identifier, password };

      // dispatch login action
      if (intent === "login") {
        await dispatch(signInUser(creds));
      }

      // dispatch signup action
      else if (intent === "signup") {
        await dispatch(signUpUser(creds));
      }

      // TODO show a success notif

      resetFields();
    };
  }

  return (
    <Layout marginTop={90}>
      <Header />

      {loading === "pending" ? (
        <Spinner />
      ) : (
        <Container>
          <Heading align={"center"}>Login or create an account</Heading>
          <TabSwitcher
            tabs={[
              {
                name: "Login",
                content: (
                  <AuthForm
                    fields={FIELDS}
                    handleChange={handleChange}
                    submitLabel={"Login"}
                    handleSubmit={handleSubmit("login")}
                  />
                ),
              },
              {
                name: "Signup",
                content: (
                  <AuthForm
                    fields={FIELDS}
                    handleChange={handleChange}
                    submitLabel={"Signup"}
                    handleSubmit={handleSubmit("signup")}
                  />
                ),
              },
            ]}
          />
        </Container>
      )}

      <NotificationMessage
        enabled={!!error}
        icon={"error"}
        message={error?.message}
        timeout={5000}
        variant={"light"}
      />
    </Layout>
  );
}
