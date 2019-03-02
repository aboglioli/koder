import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

import { rhythm } from '../utils/typography';

const PostCategoryAndTags = ({ category, tags, draft }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: rhythm(0.5),
        backgroundColor: 'rgba(255, 229, 100, 0.2)',
        paddingLeft: rhythm(1 / 4),
        borderRadius: rhythm(1 / 8),
        marginBottom: rhythm(1),
      }}
    >
      {draft && (
        <>
          <b style={{ color: '#e00' }}>DRAFT</b>
          <span
            style={{ marginLeft: rhythm(1 / 8), marginRight: rhythm(1 / 8) }}
          >
            |
          </span>
        </>
      )}
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
  );
};

PostCategoryAndTags.defaultProps = {
  draft: false,
};

PostCategoryAndTags.propTypes = {
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  draft: PropTypes.bool,
};

export default PostCategoryAndTags;
