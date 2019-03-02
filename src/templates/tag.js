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
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'}`;

  return (
    <Layout smallHeader title={tag} description={`Publicaciones en ${tag}`}>
      <h1 style={{ marginBottom: rhythm(1) }}>{tag}</h1>
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
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fields: { draft: { eq: false } }
      }
    ) {
      totalCount
      edges {
        node {
          excerpt
          ...PostFrontmatter
          fields {
            slug
          }
        }
      }
    }
  }
`;
