/* ---------------------------------
Profile
--------------------------------- */

import * as React from "react";
import {PropsWithChildren, ReactElement} from "react";
import {Layout} from "../../components/Layout";
import {useRouter} from "next/router";
import Header from "../../components/Header";
import {Heading} from "../../components/Heading";
import {Container} from "../../components/Container";
import {ContentArea} from "../../components/ContentArea";
import {SecondaryButton} from "../../components/Button";
import {MaterialIcon} from "../../components/MaterialIcon";
import Link from "next/link";
import {useAppSelector} from "../../hooks";
import {List, ListItem} from "../../components/List";
import {BodyText} from "../../components/BodyText";

type OwnProps = {};

export default function Profile({}: PropsWithChildren<OwnProps>): ReactElement | null {
  const router = useRouter();
  const { user: username } = router.query;
  const { user } = useAppSelector(state => state.auth);

  return (
    <Layout marginTop={60}>
      <Header>
        <Link href={"/notes"}>
          <SecondaryButton variant={"small"}>
            <MaterialIcon>keyboard_backspace</MaterialIcon>
            Your notes
          </SecondaryButton>
        </Link>
      </Header>

      <Container>
        <ContentArea>
          <Heading>Hey, {username}!</Heading>
          <List>
            <ListItem>
              <BodyText>{user?.username}</BodyText>
            </ListItem>

            <ListItem>
              <BodyText>{user?.email}</BodyText>
            </ListItem>
          </List>
        </ContentArea>
      </Container>
    </Layout>
  );
}
