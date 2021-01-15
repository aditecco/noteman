/* ---------------------------------
_App
--------------------------------- */
import App from "next/app";
import * as React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import normalize from "styled-normalize";
import { defaultTheme } from "../components/theme";
import ErrorBoundary from "../components/ErrorBoundary";
import "fontsource-material-icons/base-400-normal.css";
import "fontsource-karla/400-normal.css";
import "fontsource-ibm-plex-sans/400-normal.css";

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

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ErrorBoundary>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyles />

          <Component {...pageProps} />
        </ThemeProvider>
      </ErrorBoundary>
    );
  }
}

export default MyApp;
