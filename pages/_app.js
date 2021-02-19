import React, { Fragment } from 'react';
import { Global } from '@emotion/core';
import { globalStyles } from '../config/styles/globalStyle';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
