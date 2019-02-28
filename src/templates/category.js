import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { rhythm } from '../utils/typography';
import { mapPosts } from '../utils/helpers';
import Layout from '../components/layout';
import PostList from '../components/post-list';

const Category = ({ pageContext, data }) => {
  const { category } = pageContext;
  const { edges: posts, totalCount } = data.allMarkdownRemark;
  const categoryHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} in "${category}"`;

  return (
    <Layout
      smallHeader
      title={category}
      description={`Posts in ${category}`}
    >
      <h3 style={{ marginBottom: rhythm(1) }}>{categoryHeader}</h3>
      <PostList posts={mapPosts(posts)} />
    </Layout>
  );
};

Category.propTypes = {
  pageContext: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default Category;

export const query = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
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
