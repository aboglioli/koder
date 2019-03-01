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
          marginBottom: rhythm(1 / 4),
          borderTop: '1px solid rgb(232, 232, 232)',
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
