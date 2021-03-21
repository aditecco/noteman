/* ---------------------------------
Header
--------------------------------- */

import * as React from "react";
import {PropsWithChildren, ReactElement} from "react";
import Logo from "./Logo";
import {Navbar} from "./Navbar";

type OwnProps = {};

export default function Header({children}: PropsWithChildren<OwnProps>): ReactElement | null {
  return (
    <Navbar>
      <Logo />

      {children}
    </Navbar>
  );
}
