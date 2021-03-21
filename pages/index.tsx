/* ---------------------------------
Index (Auth)
--------------------------------- */

import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { Form } from "../components/Form";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Input } from "../components/Input";
import TabSwitcher from "../components/TabSwitcher";
import { Layout } from "../components/Layout";
import Header from "../components/Header";
import axios from "axios";
import { useRouter } from "next/router";

// const API = new UsersPermissionsUserApi();

export default function Index(): ReactElement | null {
  const [identifier, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // handleChange
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e?.target?.name === "identifier") {
      setUsername(e.target.value);
    } else if (e?.target?.name === "password") {
      setPassword(e.target.value);
    } else return;
  }

  // handleSubmit
  async function handleSubmit(e: React.FormEvent) {
    e?.preventDefault?.();

    // TODO display an error msg
    if (!identifier || !password) return;

    axios
      .post("http://localhost:1337/auth/local", {
        identifier,
        password,
      })
      .then(({ data }) => {
        if (window) {
          sessionStorage?.setItem?.("JWT", data?.jwt);
        }

        setToken(data?.jwt);
      })
      .catch(err => console.error(err))
      .finally(() => {
        setUsername("");
        setPassword("");
      });
  }

  useEffect(() => {
    const JWT = sessionStorage?.getItem?.("JWT");

    JWT && setToken(JWT);
  }, []);

  useEffect(() => {
    token && router.push("/notes");
  }, [token]);

  return (
    <Layout marginTop={60}>
      <Header />
      <Container>
        <Heading align={"center"}>Auth</Heading>

        <Form onSubmit={handleSubmit}>
          <TabSwitcher
            tabs={[
              {
                name: "Login",
                content: (
                  <>
                    <Input
                      type={"text"}
                      name={"identifier"}
                      placeholder={"Username"}
                      value={identifier}
                      onChange={handleChange}
                    />

                    <Input
                      type={"password"}
                      name={"password"}
                      placeholder={"Password"}
                      value={password}
                      onChange={handleChange}
                    />

                    <Button type={"submit"}>Login</Button>
                  </>
                ),
              },
              {
                name: "Signup",
                content: "signup",
              },
            ]}
          />
        </Form>
      </Container>
    </Layout>
  );
}
