import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

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
          justifyContent: 'flex-end',
        }}
      >
        <div>
          <div style={{ textAlign: 'end' }}>
            <a href={site.siteMetadata.social.github} style={{ color: '#000' }}>
              <FaGithub />
            </a>{' '}
            <a
              href={site.siteMetadata.social.linkedin}
              style={{ color: '#000' }}
            >
              <FaLinkedin />
            </a>{' '}
            <a
              href={site.siteMetadata.social.twitter}
              style={{ color: '#000' }}
            >
              <FaTwitter />
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
          <div style={{ textAlign: 'end', fontSize: rhythm(1 / 2) }}>
            <Link to="/who-am-i">Who am i?</Link>
          </div>
        </div>
        <Image
          fixed={profile.childImageSharp.fixed}
          alt={site.siteMetadata.author}
          style={{
            marginLeft: rhythm(1 / 2),
            marginBottom: 0,
            width: 64,
            height: 64,
            borderRadius: '50%',
          }}
        />
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
          linkedin
          twitter
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
