// Post.jsx
import React from 'react';

const Post = ({ post, onDelete }) => {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      {post.image && <img src={post.image} alt={post.title} />}
      <p>{post.description}</p>
      <button onClick={() => onDelete(post.id)}>Delete Post</button>
    </div>
  );
};

export default Post;
