import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { rhythm } from '../utils/typography';
import { mapPosts } from '../utils/helpers';
import Layout from '../components/layout';
import PostList from '../components/post-list';

const Tag = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges: posts, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } in "${tag}"`;

  return (
    <Layout smallHeader title={tag} description={`Publicaciones en ${tag}`}>
      <h3 style={{ marginBottom: rhythm(1) }}>{tagHeader}</h3>

      <PostList posts={mapPosts(posts)} />
    </Layout>
  );
};

Tag.propTypes = {
  pageContext: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default Tag;

export const query = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY", locale: "es")
            title
            description
            category
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
