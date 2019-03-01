import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { rhythm } from '../utils/typography';

const PostPrevNext = ({ currentPostSlug, posts }) => {
  const index = posts.findIndex(post => post.slug === currentPostSlug);

  if (index === -1) {
    return null;
  }

  const prev = index !== 0 ? posts[index - 1] : null;
  const next = index !== posts.length - 1 ? posts[index + 1] : null;

  return (
    <div
      style={{
        marginBottom: rhythm(1),
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: rhythm(0.6),
      }}
    >
      {prev ? (
        <Link style={{ float: 'left' }} to={prev.slug}>
          👈 {prev.title}
        </Link>
      ) : '*'}
      {next ? (
        <Link style={{ float: 'right' }} to={next.slug}>
          {next.title} 👉
        </Link>
      ) : '*'}
    </div>
  );
};

PostPrevNext.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentPostSlug: PropTypes.string.isRequired,
};

export default PostPrevNext;
