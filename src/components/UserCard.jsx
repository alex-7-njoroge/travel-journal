import React, { useState } from 'react'
import { Person, GeoAlt, Envelope, Calendar } from 'react-bootstrap-icons'
import './UserCard.css'

function UserCard({user}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(user.followers_count || 0);

  const handleFollowToggle = async () => {
    try {
      const endpoint = isFollowing ? 'unfollow' : 'follow';
      const response = await fetch(`https://flask-journal-82cu.onrender.com/users/${user.id}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Failed to ${endpoint} user`);
      setIsFollowing(!isFollowing);
      setFollowersCount(prevCount => isFollowing ? prevCount - 1 : prevCount + 1);
    } catch (error) {
      console.error(`Error ${isFollowing ? 'unfollowing' : 'following'} user:`, error);
    }
  };

  return (
    <div className='user-card'>
      <div className="user-avatar">
        {user.avatar ? (
          <img src={user.avatar} alt={user.username} />
        ) : (
          <Person size={40} />
        )}
      </div>
      <h3 className="user-name">{user.username}</h3>
      <div className="user-info">
        {user.location && (
          <p className="user-location">
            <GeoAlt size={14} />
            <span>{user.location}</span>
          </p>
        )}
        <p className="user-email">
          <Envelope size={14} />
          <span>{user.email}</span>
        </p>
        {user.joined_date && (
          <p className="user-joined">
            <Calendar size={14} />
            <span>Joined {new Date(user.joined_date).toLocaleDateString()}</span>
          </p>
        )}
      </div>
      <div className="user-stats">
        <div className="stat">
          <span className="stat-value">{followersCount}</span>
          <span className="stat-label">followers</span>
        </div>
        <div className="stat">
          <span className="stat-value">{user.posts_count || 0}</span>
          <span className="stat-label">posts</span>
        </div>
      </div>
      <button onClick={handleFollowToggle} className="follow-btn">
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  )
}

export default UserCard
