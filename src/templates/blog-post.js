import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import capitalize from 'lodash/capitalize';

import { rhythm } from '../utils/typography';
import Layout from '../components/layout';
import PostCategoryAndTags from '../components/post-category-and-tags';
import PostCollectionTable from '../components/post-collection-table';
import PostPrevNext from '../components/post-prev-next';

const BlogPost = ({ data, pageContext: { slug, collection } }) => {
  const {
    html,
    frontmatter: { title, date, tags, category, description },
    excerpt,
  } = data.post;

  let collectionPosts;

  if (collection && data.collection) {
    collectionPosts = data.collection.edges.map(({ node }) => ({
      title: node.frontmatter.title,
      slug: node.fields.slug,
    }));
  }

  return (
    <Layout smallHeader title={title} description={description || excerpt}>
      {collection && (
        <h3 style={{ marginBottom: rhythm(1 / 8),
                     color: 'rgb(255, 128, 74)',
        }}>
          {collection}
        </h3>
      )}
      <h1 style={{ marginBottom: rhythm(1 / 8) }}>{title}</h1>
      <div style={{ color: 'rgba(120, 124, 126)', marginBottom: rhythm(1) }}>
        {capitalize(date)}
      </div>

      <PostCategoryAndTags category={category} tags={tags} />

      {collection && (
        <PostCollectionTable currentPostSlug={slug} posts={collectionPosts} />
      )}

      <div dangerouslySetInnerHTML={{ __html: html }} />

      {collection && (
        <PostPrevNext currentPostSlug={slug} posts={collectionPosts} />
      )}
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const query = graphql`
  query($slug: String!, $collection: String) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY", locale: "en")
        description
        tags
        category
      }
    }
    collection: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: { frontmatter: { collection: { eq: $collection } } }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default BlogPost;
