import React from 'react';
import PropTypes from 'prop-types';

import { rhythm } from '../utils/typography';
import Head from './head';
import Header from './header';
import Footer from './footer';

const Layout = ({ children, nav, smallHeader, ...headProps }) => (
  <>
    <Head {...headProps} />
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(24),
        padding: `0 1rem`,
      }}
    >
      <Header small={smallHeader} />
      {nav && <nav>{nav}</nav>}
      <main>{children}</main>
      <Footer />
    </div>
  </>
);

Layout.propTypes = {
  nav: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  smallHeader: PropTypes.bool,
};

export default Layout;
