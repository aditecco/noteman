/* ---------------------------------
Profile
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { Heading } from "../../components/Heading";
import { Container } from "../../components/Container";
import { ContentArea } from "../../components/ContentArea";
import { SecondaryButton } from "../../components/Button";
import { MaterialIcon } from "../../components/MaterialIcon";
import Link from "next/link";
import { List, ListItem } from "../../components/List";
import { BodyText } from "../../components/BodyText";
import { signOutUser } from "../../state/auth";
import { destroyNotes } from "../../state/notes";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";

type OwnProps = {};

export default function Profile({}: PropsWithChildren<OwnProps>): ReactElement | null {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user: username } = router.query;
  const { user } = useAppSelector(state => state.auth);

  // handleLogout
  function handleLogout() {
    dispatch(signOutUser());
    dispatch(destroyNotes());

    sessionStorage?.removeItem?.(TOKEN_STORAGE_KEY);
    sessionStorage?.removeItem?.(USER_STORAGE_KEY);

    router.push("/");
  }

  return (
    <Layout marginTop={60}>
      <Header>
        <Link href={"/notes"}>
          <SecondaryButton variant={"small"}>
            <MaterialIcon>keyboard_backspace</MaterialIcon> Your notes
          </SecondaryButton>
        </Link>
      </Header>

      <Container>
        <ContentArea>
          <Heading>Hey, {username}!</Heading>
          <List>
            <ListItem>
              <BodyText>Your username: {user?.username}</BodyText>
            </ListItem>

            <ListItem>
              <BodyText>Your email: {user?.email}</BodyText>
            </ListItem>
          </List>

          <SecondaryButton onClick={handleLogout}>Logout</SecondaryButton>
        </ContentArea>
      </Container>
    </Layout>
  );
}