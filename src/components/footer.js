import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { rhythm } from '../utils/typography';

const Footer = () => (
  <StaticQuery
    query={query}
    render={({ site }) => (
      <footer
        style={{
          textAlign: 'center',
          marginTop: rhythm(1 / 2),
          marginBottom: rhythm(1 / 2),
          borderTop: '1px solid rgb(232, 232, 232)',
          paddingTop: rhythm(1 / 2),
        }}
      >
        {site.siteMetadata.author} © {new Date().getFullYear()}. Built with{' '}
        <a href="https://www.gatsbyjs.org">Gatsby</a>.
      </footer>
    )}
  />
);

const query = graphql`
  query {
    site {
      siteMetadata {
        author
        email
      }
    }
  }
`;

export default Footer;
