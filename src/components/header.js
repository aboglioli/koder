import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm } from '../utils/typography';

const Header = ({ small }) => (
  <header
    style={{
      margin: `0 0 ${rhythm(1 / 2)} 0`,
    }}
  >
    <StaticQuery
      query={query}
      render={({ site, logo }) => {
        const { title } = site.siteMetadata;
        const width = small ? 100 : 100;

        return (
          <Link
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              justifyContent: small ? 'start' : 'center',
              alignItems: 'center',
            }}
            to="/"
          >
            <Image
              fixed={logo.childImageSharp.fixed}
              alt={title}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: width,
                width: width,
                height: width,
              }}
              imgStyle={{
                width: width,
                height: width,
              }}
            />

            <h1
              style={{
                fontSize: rhythm(1),
                margin: 0,
              }}
            >
              KODER
            </h1>
            <h3
              style={{
                fontSize: rhythm(0.6),
                color: 'rgb(255, 124, 75)',
                margin: 0,
              }}
            >
              DEV
            </h3>
          </Link>
        );
      }}
    />
  </header>
);

Header.defaultProps = {
  small: false,
};

Header.propTypes = {
  small: PropTypes.bool,
};

const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    logo: file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default Header;
