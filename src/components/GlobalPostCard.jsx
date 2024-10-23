import React from 'react'
import { Person, ChatDots, Calendar, Image } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import styles from './GlobalPostCard.module.css'

function GlobalPostCard({ post }) {
  return (
    <div className={styles.globalPostCard}>
      <Link to={`/post/${post.id}`} className={styles.cardLink}>
        <div className={styles.cardHeader}>
          {post.image_url ? (
            <img src={post.image_url} alt={post.title} className={styles.postImage} />
          ) : (
            <div className={styles.placeholderImage}>
              <Image size={48} />
            </div>
          )}
        </div>
        <div className={styles.cardBody}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <p className={styles.postContent}>{post.content.substring(0, 100)}...</p>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.metaItem}>
            <Person className={styles.icon} />
            <span>{post.author}</span>
          </div>
          <div className={styles.metaItem}>
            <ChatDots className={styles.icon} />
            <span>{post.number_of_comments}</span>
          </div>
          <div className={styles.metaItem}>
            <Calendar className={styles.icon} />
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default GlobalPostCard
