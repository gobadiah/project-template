import { injectGlobal } from 'emotion';

import fond from '~/images/fond.jpg';

export * from './styled-components';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  :root {
    --apple-green: #7ed321;
    --white: #ffffff;
    --dark-blue-grey: #0e1e35;
    --dull-blue: #4c6fa5;
    --pale-red: #da4b42;
    --neon-red: #ff003c;
    --bluish-grey: #828e9e;
    --yellow-green: #cfff45;
  }

  * {
    font-family: 'Titillium Web', sans-serif;
  }

  html {
    background: url(${fond}) no-repeat center center fixed;
    background-size: cover;
  }

  a {
   font-size: 26px;
   font-weight: bold;
   line-height: 1.04;
   text-align: center;
   color: var(--dark-blue-grey);
  }

  input {
    border-radius: 5px;
    border-width: 0px;
    padding-left: 32px;
    font-size: 24px;
    font-weight: bold;
    width: 100%;
    height: 77px;
    display: flex;
    text-align: left;
    color: var(--dark-blue-grey);
    line-height: 1.13;
    box-sizing:border-box;
  }

  input::placeholder {
    font-size: 24px;
    font-weight: bold;
    line-height: 1.13;
    text-align: left;
    color: #b6b6b6;
  }

  label {
    font-size: 26px;
    font-weight: bold;
    line-height: 1.04;
    text-align: left;
    color: var(--dark-blue-grey);
  }
`;
