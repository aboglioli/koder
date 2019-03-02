import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import capitalize from 'lodash/capitalize';
import kebabCase from 'lodash/kebabCase';
import { FaBook } from 'react-icons/fa';

import { rhythm } from '../utils/typography';

const PostItem = ({
  slug,
  title,
  date,
  description,
  category,
  collection,
  draft,
}) => (
  <article
    style={{
      padding: rhythm(1 / 2),
      marginBottom: rhythm(1 / 2),
      borderRadius: 4,
      border: '3px solid rgb(250, 250, 250)',
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
      {draft && (
        <>
          <b style={{ color: '#e00' }}>DRAFT</b>
          <span
            style={{ marginLeft: rhythm(1 / 8), marginRight: rhythm(1 / 8) }}
          >
            •
          </span>
        </>
      )}
      {category && (
        <>
          <Link
            style={{
              fontWeight: 'bold',
              color: 'rgb(255, 128, 74)',
            }}
            to={`/category/${kebabCase(category)}`}
          >
            {category}
          </Link>
          <span
            style={{ marginLeft: rhythm(1 / 8), marginRight: rhythm(1 / 8) }}
          >
            •
          </span>
        </>
      )}
      <div style={{ color: 'rgba(120, 124, 126)' }}>{capitalize(date)}</div>
    </div>
    {collection && (
      <h5
        style={{
          marginBottom: rhythm(0.3),
          fontSize: rhythm(0.5),
          fontWeight: 500,
          color: '#000',
          display: 'flex',
        }}
      >
        <FaBook
          style={{ marginRight: rhythm(1 / 8), color: 'rgb(200, 200, 200)' }}
        />{' '}
        {collection}
      </h5>
    )}
    <h3
      style={{
        marginBottom: rhythm(0.2),
        fontSize: rhythm(0.8),
        fontWeight: 500,
        color: '#000',
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
  draft: PropTypes.bool.isRequired,
};

export default PostItem;
