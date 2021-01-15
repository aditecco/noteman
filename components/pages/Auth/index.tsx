/* ---------------------------------
Auth
--------------------------------- */

import React, { useState } from "react";
import { Button } from "/imports/ui/Button";
import { Input } from "/imports/ui/Input";
import { Form } from "/imports/ui/Form";
import { Container } from "/imports/ui/Container";
import { Heading } from "/imports/ui/Heading";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

function Auth() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const user = useTracker(() => Meteor.user());

  // handleChange
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target?.name === "username") {
      setUsername(e.target.value);
    } else if (e?.target?.name === "password") {
      setPassword(e.target.value);
    } else return;
  }

  // handleSubmit
  function handleSubmit(e: React.FormEvent) {
    e?.preventDefault?.();

    // TODO display an error msg
    if (!username || !password) return;

    Meteor.loginWithPassword(username, password);
  }

  return (
    <Container>
      <Heading align={"center"}>Auth</Heading>

      <Form onSubmit={handleSubmit}>
        <Input
          type={"text"}
          name={"username"}
          placeholder={"Username"}
          value={username}
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
      </Form>
    </Container>
  );
}

export default Auth;
