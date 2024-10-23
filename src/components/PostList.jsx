// PostList.jsx
import React from 'react';
import Post from './Post';

const PostList = ({ posts, onDelete }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default PostList;
