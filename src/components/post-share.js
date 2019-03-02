import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

import { rhythm } from '../utils/typography';

const PostShare = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        fontSize: rhythm(0.5),
        backgroundColor: 'rgba(255, 229, 100, 0.2)',
        padding: `${rhythm(1 / 4)} ${rhythm(1 / 4)}`,
        borderRadius: rhythm(1 / 8),
        marginTop: rhythm(1 / 2),
      }}
    >
      <FaShareAlt />
    </div>
  );
};

export default PostShare;
