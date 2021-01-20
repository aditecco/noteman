/* ---------------------------------
_App
--------------------------------- */
import * as React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import normalize from "styled-normalize";
import { defaultTheme } from "../components/theme";
import ErrorBoundary from "../components/ErrorBoundary";
import "fontsource-material-icons/base-400-normal.css";
import "fontsource-karla/400-normal.css";
import "fontsource-ibm-plex-sans/400-normal.css";
import "react-mde/lib/styles/css/react-mde-all.css";

const GlobalStyles = createGlobalStyle`
  // normalize.css
  ${normalize}

  // other globals
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.bodyFont};
    margin: 0;
    padding: 0;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
