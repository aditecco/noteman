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
  const [email, setEmail] = useState<string>("");

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

  const SIGNUP_FIELDS: FieldConfig[] = [
    {
      value: identifier,
      placeholder: "username",
      name: "username",
    },
    {
      value: email,
      placeholder: "email@example.com",
      name: "email",
      type: "email",
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
    switch (e?.target?.name) {
      case "identifier":
      case "username": {
        setIdentifier(e.target.value);
        break;
      }

      case "email": {
        setEmail(e.target.value);
        break;
      }

      case "password": {
        setPassword(e.target.value);
        break;
      }

      default: {
        break;
      }
    }
  }

  // resetFields
  function resetFields() {
    setIdentifier("");
    setEmail("");
    setPassword("");
  }

  // handleSubmit
  function handleSubmit(intent: string) {
    return async function (e: React.FormEvent) {
      e?.preventDefault?.();

      if (intent === "login") {
        // TODO display an error msg
        if (!identifier || !password) return;

        const creds = { identifier, password };

        // dispatch login action
        await dispatch(signInUser(creds));
      }

      // dispatch signup action
      else if (intent === "signup") {
        // TODO display an error msg
        if (!identifier || !email || !password) return;

        const creds = { identifier, email, password };

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
        <Container maxWidth={460}>
          <Heading align={"center"}>Login or create an account</Heading>
          <TabSwitcher
            onTabSwitch={resetFields}
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
                    fields={SIGNUP_FIELDS}
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
        timeout={3000}
        variant={"light"}
      />
    </Layout>
  );
}
