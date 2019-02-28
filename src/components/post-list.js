import React from 'react';
import PropTypes from 'prop-types';

import PostItem from './post-item';

const PostList = ({ posts }) =>
  posts.map(post => (
    <PostItem
      key={post.slug}
      slug={post.slug}
      title={post.title}
      date={post.date}
      category={post.category}
      tags={post.tags}
      description={post.description}
    />
  ));

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
