import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

const Head = ({ title, description, image, url, lang, keywords }) => (
  <StaticQuery
    query={query}
    render={({ site: { siteMetadata: meta } }) => {
      url = url || meta.url;
      description = description || meta.description;
      image = image ? `${url}/${image}` : `${url}/${meta.image}`;

      return (
        <Helmet
          htmlAttributes={{
            lang,
          }}
          title={title}
          defaultTitle={meta.title}
          titleTemplate={`%s | ${meta.title}`}
        >
          <link href={meta.url} rel="canonical" />

          <meta name="description" content={description} />
          <meta name="image" content={image} />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={title || meta.title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          {keywords.length > 0 && (
            <meta name="keywords" content={keywords.join(', ')} />
          )}
        </Helmet>
      );
    }}
  />
);

Head.defaultProps = {
  lang: 'es',
  keywords: [],
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  lang: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
};

const query = graphql`
  query {
    site {
      siteMetadata {
        url
        title
        description
        image
      }
    }
  }
`;

export default Head;
