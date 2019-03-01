import React from 'react';
import PropTypes from 'prop-types';

import PostItem from './post-item';

const PostList = ({ posts }) =>
  posts.map(post => <PostItem key={post.slug} {...post} />);

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
