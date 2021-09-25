import React from 'react';
import { theme as chakraTheme } from '@chakra-ui/core';

const fonts = {
  ...chakraTheme.fonts,
  mono: `'Menlo', monospace`,
  heading: `'Oswald', sans-serif`,
  body: `'Montserrat', sans-serif`
};

const breakpoints = ['48em', '62em', '80em'];

const theme = {
  ...chakraTheme,
  colors: {
    transparent: 'transparent',
    ...chakraTheme.colors,
    black: '#16161D',
    brand: {
      yellow: '#F0EB70',
      blue_primary: '#1E85C3',
      blue_accent: '#7690B9',
      lightgray: '#ebf1f1'
    }
  },
  fonts,
  breakpoints,
  icons: {
    ...chakraTheme.icons,
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: '0 0 3000 3163'
    },
    google: {
      path: (
        <svg width="118" height="120" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path
              d="M117.6 61.364c0-4.255-.382-8.346-1.09-12.273H60V72.3h32.29c-1.39 7.5-5.617 13.855-11.972 18.11v15.054H99.71c11.346-10.446 17.891-25.828 17.891-44.1z"
              fill="#4285F4"
            />
            <path
              d="M60 120c16.2 0 29.782-5.373 39.71-14.536L80.317 90.409c-5.373 3.6-12.245 5.727-20.318 5.727-15.627 0-28.855-10.554-33.573-24.736H6.382v15.545C16.255 106.555 36.545 120 60 120z"
              fill="#34A853"
            />
            <path
              d="M26.427 71.4c-1.2-3.6-1.882-7.445-1.882-11.4s.682-7.8 1.882-11.4V33.055H6.382A59.976 59.976 0 0 0 0 60a59.976 59.976 0 0 0 6.382 26.945L26.427 71.4z"
              fill="#FBBC05"
            />
            <path
              d="M60 23.864c8.81 0 16.718 3.027 22.936 8.972l17.21-17.209C89.754 5.945 76.172 0 60 0 36.545 0 16.255 13.445 6.382 33.055L26.427 48.6C31.145 34.418 44.373 23.864 60 23.864z"
              fill="#EA4335"
            />
            <path d="M0 0h120v120H0V0z" />
          </g>
        </svg>
      ),
      viewBox: '0 0 120 120'
    },
    circle: {
      path: <circle cx="12" cy="12" r="10"></circle>,
      viewBox: '0 0 24 24'
    },
    open_circle: {
      path: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      )
    },
    prev: {
      path: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      ),
      viewBox: '0 0 24 24'
    },
    next: {
      path: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      ),
      viewBox: '0 0 24 24'
    }
  }
};

export default theme;
