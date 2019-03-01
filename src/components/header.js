import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm } from '../utils/typography';

const Header = ({ small }) => (
  <header
    style={{
      margin: `${rhythm(1)} 0`,
    }}
  >
    <StaticQuery
      query={query}
      render={({ site, logo }) => {
        const { title } = site.siteMetadata;
        const width = small ? 30 : 50;

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
            {small ? (
              <h3 style={{ margin: 0 }}>{title}</h3>
            ) : (
              <h1 style={{ margin: 0 }}>{title}</h1>
            )}
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
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default Header;
