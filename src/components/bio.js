import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';

import { rhythm } from '../utils/typography';

const Bio = () => (
  <StaticQuery
    query={query}
    render={({ profile, site }) => (
      <aside
        style={{
          marginBottom: rhythm(1 / 2),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Image
          fixed={profile.childImageSharp.fixed}
          alt={site.siteMetadata.author}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: 64,
            height: 64,
            borderRadius: '50%',
          }}
        />
        <div>
          <div style={{ textAlign: 'end' }}>
            <a href={site.siteMetadata.social.github} style={{ color: '#000' }}>
              <FaGithub />
            </a>{' '}
            <a
              href={site.siteMetadata.social.instagram}
              style={{ color: '#000' }}
            >
              <FaInstagram />
            </a>{' '}
            <a
              href={site.siteMetadata.social.facebook}
              style={{ color: '#000' }}
            >
              <FaFacebook />
            </a>
          </div>
          <div>Alan Boglioli</div>
        </div>
      </aside>
    )}
  />
);

const query = graphql`
  query {
    site {
      siteMetadata {
        author
        email
        social {
          github
          instagram
          facebook
        }
      }
    }
    profile: file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fixed(width: 200, height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default Bio;
