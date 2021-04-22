/* ---------------------------------
Style constants
--------------------------------- */

import { DefaultTheme } from "styled-components";
import chroma from "chroma-js";

export const defaultTheme: DefaultTheme = {
  accent01: "rebeccapurple",
  accent02: "",
  accent01light: chroma("rebeccapurple").alpha(0.5).hex(),
  alternateFontColorLight01: "whitesmoke",
  alternateFontColorDark01: "darkgray",
  backgroundDark01: "",
  backgroundDark02: "",
  backgroundDark03: "",
  backgroundLight01: "",
  backgroundLight02: "",
  backgroundLight03: "",
  baseFontColor: "",
  baseFontSize: 16,
  bodyFont: "'Karla', sans-serif",
  borderRadius: 4,
  boxShadow: "",
  footerHeight: 70,
  headingFont: "",
  linearGradient: "",
  navHeight: 60,
  stroke01: "#ababab",
  subtitleFontSize: 14,
  titleFontSize: 24,
};
