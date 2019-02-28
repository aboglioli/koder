import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import capitalize from 'lodash/capitalize';

import { rhythm } from '../utils/typography';
import Layout from '../components/layout';

const BlogPost = ({ data }) => {
  const {
    html,
    frontmatter: { title, date, tags, category, description },
    excerpt,
  } = data.markdownRemark;

  return (
    <Layout smallHeader title={title} description={description || excerpt}>
      <h1 style={{ marginBottom: rhythm(1 / 8) }}>{title}</h1>
      <div style={{ color: 'rgba(120, 124, 126)', marginBottom: rhythm(1) }}>
        {capitalize(date)}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          fontSize: rhythm(0.5),
          backgroundColor: 'rgba(255, 229, 100, 0.2)',
          borderRadius: rhythm(1 / 4),
          padding: rhythm(1 / 4),
          marginBottom: rhythm(1),
          border: `1px solid rgba(0, 0, 0, 0.2)`,
        }}
      >
        <Link
          style={{
            fontWeight: 'bold',
            color: 'inherit',
          }}
          to={`/category/${kebabCase(category)}`}
        >
          {category}
        </Link>

        {tags && tags.length > 0 && (
          <>
            <span
              style={{ marginLeft: rhythm(1 / 8), marginRight: rhythm(1 / 8) }}
            >
              •
            </span>
            {tags.map((tag, i) => (
              <div key={tag}>
                <Link
                  style={{
                    color: '#555',
                  }}
                  to={`/tag/${kebabCase(tag)}`}
                >
                  {tag}
                </Link>
                {i < tags.length - 1 && (
                  <span
                    style={{
                      marginLeft: rhythm(1 / 8),
                      marginRight: rhythm(1 / 8),
                    }}
                  >
                    ·
                  </span>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
  }
`;

export default BlogPost;
