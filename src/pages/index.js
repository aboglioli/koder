import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { mapPosts } from '../utils/helpers';
import Layout from '../components/layout';
import Nav from '../components/nav';
import PostList from '../components/post-list';

const Index = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  console.log(posts);

  return (
    <Layout nav={<Nav />}>
      <PostList posts={mapPosts(posts)} />
    </Layout>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY", locale: "en")
            title
            description
            category
            tags
            collection
          }
        }
      }
    }
  }
`;

export default Index;
