import React, { useState } from 'react';
import './PostForm.css'; // Import the CSS file
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && content) {
      const newPost = {
        title,
        content,
        image_url: imageUrl
      };
      let token = localStorage.getItem('token');
      try {
        const res = await fetch('https://flask-journal-82cu.onrender.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(newPost),
        });
        const data = await res.json();
        if (res.status === 201) {
          setMessage({ type: 'success', text: 'Post created successfully' });
          setTimeout(() => {
            setTitle('');
            setContent('');
            setImageUrl('');
            navigate('/home');
          }, 2000);
        } else {
          setMessage({ type: 'error', text: `Error: ${data.message}` });
        }
      } catch (error) {
        console.error('Error creating post:', error);
        setMessage({ type: 'error', text: 'An error occurred while creating the post. Please try again.' });
      }
    }
  };

  return (
    <div className="post-form-container">
      <Navbar />
      <div className="post-form-wrapper">
        <form onSubmit={handleSubmit} className="post-form">
          <h2>Create a New Post</h2>
          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              placeholder="Write your post content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL (optional)</label>
            <input
              type="text"
              id="imageUrl"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
