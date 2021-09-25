import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /*
  ------------------------------------
                  RESET
  ------------------------------------
  */

  /*
  http://meyerweb.com/eric/tools/css/reset/
  v2.0 | 20110126
  License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /*
  HTML5 display-role reset for older browsers
  */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /*
  ------------------------------------
            General Styles
  ------------------------------------
  */

  :root {
    --color_black: #000;
    --color_gray: #666;
    --stripe_height: 7px;
    --lp_btn_color:#001940;
    --accent-color:#EE6C4D;
    --btn_color: #666;
    --btn_background: #fff;
    --btn_color_hover: #fff;
    --btn_background_hover: var(--color_gray);
    --border_color: var(--color_gray);
    --border_color_hover: var(--color_black);
    --my-gradient: linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4);
    --fade-gradient:linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 89%,rgba(255,255,255,1) 98%);
    --overlay-color:linear-gradient(to bottom, rgba(99,99,99,.8) 89%,rgba(99,99,99,.8) 98%);
  }

  html {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;

  }
  *, *:before, *:after {
    box-sizing: inherit;
    position: relative;
  }
  html, body, #root {
    width: 100%;
    height: 100%;
    background-color: white;
    font-family: 'Roboto', sans-serif;
  }
`;
