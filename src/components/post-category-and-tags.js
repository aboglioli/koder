import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

import { rhythm } from '../utils/typography';

const PostCategoryAndTags = ({ category, tags }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: rhythm(0.5),
        backgroundColor: 'rgba(255, 229, 100, 0.2)',
        borderRadius: rhythm(1 / 8),
        padding: rhythm(1 / 4),
        marginBottom: rhythm(1),
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
  );
};

PostCategoryAndTags.propTypes = {
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default PostCategoryAndTags;
