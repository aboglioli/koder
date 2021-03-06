import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { mapPosts } from '../utils/helpers';
import Layout from '../components/layout';
import PostList from '../components/post-list';

const Index = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  // disable Nav
  return (
    <Layout>
      <PostList posts={mapPosts(posts)} />
    </Layout>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  fragment PostFrontmatter on MarkdownRemark {
    frontmatter {
      date(formatString: "MMMM DD, YYYY", locale: "en")
      title
      description
      category
      tags
      collection
      draft
    }
  }

  fragment PostFields on MarkdownRemark {
    fields {
      slug
    }
  }

  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { draft: { eq: false } } }
    ) {
      edges {
        node {
          excerpt
          ...PostFields
          ...PostFrontmatter
        }
      }
    }
  }
`;

export default Index;
