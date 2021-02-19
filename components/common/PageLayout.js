import React, { Fragment } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

function PageLayout({ children }) {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
}

export default PageLayout;
