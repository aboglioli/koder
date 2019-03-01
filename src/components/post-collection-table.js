import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { rhythm } from '../utils/typography';

const PostCollectionTable = ({ currentPostSlug, posts }) => {
  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        padding: `${rhythm(1 / 2)} ${rhythm(1)}`,
        marginBottom: rhythm(1),
        borderRadius: rhythm(1 / 8),
      }}
    >
      <p
        style={{
          marginBottom: rhythm(1 / 4),
          fontSize: rhythm(0.6),
        }}
      >
        Content
      </p>
      <ol
        style={{
          margin: 0,
          padding: 0,
          fontSize: rhythm(1 / 2),
          color: '#a0a0a0',
        }}
      >
        {posts.map(post => (
          <li key={post.slug} style={{ margin: 0, color: '#555' }}>
            {post.slug === currentPostSlug ? (
              <span style={{ fontWeight: 700 }}>{post.title}</span>
            ) : (
              <Link to={post.slug}>{post.title}</Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

PostCollectionTable.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentPostSlug: PropTypes.string.isRequired,
};

export default PostCollectionTable;
