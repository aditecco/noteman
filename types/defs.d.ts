/* ---------------------------------
defs for missing types
--------------------------------- */

import "styled-components";

// classnames
declare module "classnames";

// styled-components
declare module "styled-components" {
  export interface DefaultTheme {
    accent01: string;
    accent02: string;
    alternateFontColorLight01: string;
    alternateFontColorDark01: string;
    backgroundDark01: string;
    backgroundDark02: string;
    backgroundDark03: string;
    backgroundLight01: string;
    backgroundLight02: string;
    backgroundLight03: string;
    baseFontColor: string;
    baseFontSize: number;
    bodyFont: string;
    borderRadius: number;
    boxShadow: string;
    footerHeight: number;
    headingFont: string;
    linearGradient: string;
    navHeight: number;
    stroke01: string;
    subtitleFontSize: number;
    titleFontSize: number;
  }
}
