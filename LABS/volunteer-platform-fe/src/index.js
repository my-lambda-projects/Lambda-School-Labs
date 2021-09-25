import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { StateProvider } from './contexts/StateProvider';
import * as Sentry from '@sentry/browser';
import * as reset from './styles/reset.css';
import 'antd/dist/antd.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import * as global from './styles/global.css';
import { initialState } from './reducers/initialState';
import { mainReducer } from './reducers/mainReducer';
import ScrollToTop from './components/UtilComponents/ScrollToTop';

//enable Sentry only for production builds
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://0ff73aa2b95c4b75b27ed6fff1c45dab@sentry.io/1728693',
  });
}

const GlobalStyle = createGlobalStyle`
    ${reset}
    ${global}
`;

const theme = {
  primary: '#003d61',
  primary1: '#e6fcff',
  primary2: '#baf6ff',
  primary3: '#8ee8fa',
  primary4: '#61d1ed',
  primary5: '#38b9e0',
  primary6: '#12a0d3',
  primary7: '#077bad',
  primary8: '#005a87',
  primary9: '#003d61',
  primary10: '#00233b',

  accent: '#fa8c16',
  accent1: '#fff7e6',
  accent2: '#ffe7ba',
  accent3: '#ffd591',
  accent4: '#ffc069',
  accent5: '#ffa940',
  accent6: '#fa8c16',
  accent7: '#d46b08',
  accent8: '#ad4e00',
  accent9: '#873800',
  accent10: '#612500',

  gray: '#bfbfbf',
  gray1: '#ffffff',
  gray2: '#fafafa',
  gray3: '#f5f5f5',
  gray4: '#e8e8e8',
  gray5: '#d9d9d9',
  gray6: '#bfbfbf',
  gray7: '#8c8c8c',
  gray8: '#595959',
  gray9: '#262626',
  gray10: '#000000',

  bodytext:
    "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB','Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji','Segoe UI Emoji', 'Segoe UI Symbol'",
  titletext: "'Arvo', sans-serif",

  borderRadiusDefault: '10px',
  footerHeight: '130px',
  footerPadding: '160px', // footer height plus extra
  headerHeight: '64px', // set by antd
  
  maxWidth: '1088px',
  maxBleed: '1136px',
  sideGutters: '16px',
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <StateProvider initialState={initialState} reducer={mainReducer}>
        <Router>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </Router>
      </StateProvider>
    </>
  </ThemeProvider>,
  document.getElementById('root')
);
