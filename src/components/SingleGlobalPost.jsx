import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { Person, Calendar, ChatDots, GeoAlt } from 'react-bootstrap-icons';
import styles from './SingleGlobalPost.module.css';

function SingleGlobalPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSinglePost();
    fetchComments();
  }, [id]);

  const fetchSinglePost = async () => {
    try {
      const response = await fetch(`https://flask-journal-82cu.onrender.com/posts/${id}`);
      if (!response.ok) throw new Error('Failed to fetch post');
      const data = await response.json();
      setPost(data);
      fetchAuthor(data.author_id);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthor = async (authorId) => {
    try {
      const response = await fetch(`https://flask-journal-82cu.onrender.com/users/${authorId}`);
      if (!response.ok) throw new Error('Failed to fetch author');
      const data = await response.json();
      setAuthor(data);
    } catch (error) {
      console.error('Error fetching author:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://flask-journal-82cu.onrender.com/posts/${id}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    const newComment = { content: userComment };
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`https://flask-journal-82cu.onrender.com/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newComment),
      });
      if (!res.ok) throw new Error('Failed to add comment');
      await fetchComments();
      setUserComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!post) return null;

  return (
    <div className={styles.singleGlobalPost}>
      <Navbar />
      <div className={styles.heroImage} style={{backgroundImage: `url(${post.image_url})`}}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.postTitle}>{post.title}</h1>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.postContainer}>
          <div className={styles.postMeta}>
            <div className={styles.metaItem}>
              <Person className={styles.icon} />
              <span>{post.author}</span>
            </div>
            <div className={styles.metaItem}>
              <Calendar className={styles.icon} />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <div className={styles.metaItem}>
              <ChatDots className={styles.icon} />
              <span>{comments.length} comments</span>
            </div>
            <div className={styles.metaItem}>
              <GeoAlt className={styles.icon} />
              <span>{post.location || 'Unknown Location'}</span>
            </div>
          </div>
          <div className={styles.postContent}>{post.content}</div>
          
          {author && (
            <div className={styles.authorInfo}>
              <img src={author.avatar_url || 'https://via.placeholder.com/150'} alt={author.name} className={styles.authorAvatar} />
              <div className={styles.authorDetails}>
                <h2>About the Author</h2>
                <h3>{author.name}</h3>
                <p className={styles.authorUsername}>@{author.username}</p>
                <p className={styles.authorDescription}>{author.description || 'No description available.'}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.commentsSection}>
          <h2>Comments</h2>
          <form onSubmit={handleSubmit} className={styles.commentForm}>
            <textarea
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="Share your thoughts..."
              className={styles.commentInput}
            />
            <button type="submit" className={styles.commentButton}>Post Comment</button>
          </form>
          <div className={styles.commentsList}>
            {comments.map(comment => (
              <div key={comment.id} className={styles.comment}>
                <div className={styles.commentAuthor}>
                  <Person className={styles.icon} />
                  <span>{comment.author}</span>
                </div>
                <p className={styles.commentContent}>{comment.content}</p>
                <div className={styles.commentDate}>
                  <Calendar className={styles.icon} />
                  <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleGlobalPost;
