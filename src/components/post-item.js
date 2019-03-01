import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import capitalize from 'lodash/capitalize';
import kebabCase from 'lodash/kebabCase';

import { rhythm } from '../utils/typography';

const PostItem = ({ slug, title, date, description, category, collection }) => (
  <article
    style={{
      backgroundColor: 'rgb(250, 250, 250)',
      padding: rhythm(1 / 2),
      marginBottom: rhythm(1),
      borderRadius: 4,
    }}
  >
    <div
      style={{
        display: 'flex',
        fontSize: rhythm(0.5),
        borderBottom: '1px solid rgb(232, 232, 232)',
        marginBottom: rhythm(0.3),
      }}
    >
      <div style={{ color: 'rgba(120, 124, 126)' }}>{capitalize(date)}</div>

      {category && (
        <>
          <span
            style={{ marginLeft: rhythm(1 / 8), marginRight: rhythm(1 / 8) }}
          >
            •
          </span>
          <Link
            style={{
              fontWeight: 'bold',
              color: 'inherit',
            }}
            to={`/category/${kebabCase(category)}`}
          >
            {category}
          </Link>
        </>
      )}
    </div>
    {collection && (
      <h5
        style={{
          marginBottom: rhythm(0.1),
          fontSize: rhythm(0.5),
          fontWeight: 500,
          color: '#555',
        }}
      >
        {collection}
      </h5>
    )}
    <h3
      style={{
        marginBottom: rhythm(0.2),
        fontSize: rhythm(0.8),
        fontWeight: 500,
        color: 'rgb(171, 58, 58)',
      }}
    >
      <Link style={{ color: 'inherit', textDecoration: 'none' }} to={slug}>
        {title}
      </Link>
    </h3>
    <p
      style={{ margin: 0, fontSize: rhythm(0.55) }}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  </article>
);

PostItem.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  collection: PropTypes.string,
};

export default PostItem;
