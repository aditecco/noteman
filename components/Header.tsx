/* ---------------------------------
Header
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import Logo from "./Logo";
import { Navbar } from "./Navbar";
import Link from "next/link";

type OwnProps = {};

export default function Header({
  children,
}: PropsWithChildren<OwnProps>): ReactElement | null {
  return (
    <Navbar>
      <Link href={"/"}>
        <Logo />
      </Link>

      {children}
    </Navbar>
  );
}
