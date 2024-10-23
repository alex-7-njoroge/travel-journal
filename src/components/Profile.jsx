import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Person, CardList, PersonFillDown, PersonFillUp, ChatDots } from 'react-bootstrap-icons'
import { usePostsStore } from '../stores/postsStore'  
import GlobalPostCard from './GlobalPostCard'
import Navbar from './Navbar'

function Profile() {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [isFollowing, setIsFollowing] = useState(false)
    const { posts, setPosts } = usePostsStore()

    useEffect(() => {
        fetchUserData()
        fetchUserPosts()
    }, [id])

    const fetchUserData = async () => {
        try {
            const response = await fetch(`https://flask-journal-82cu.onrender.com/users/${id}`)
            if (!response.ok) throw new Error('Failed to fetch user data')
            const data = await response.json()
            setUser(data)
            // You might want to check if the current user is following this user
            // and set isFollowing accordingly
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    const fetchUserPosts = async () => {
        try {
            const response = await fetch(`https://flask-journal-82cu.onrender.com/users/${id}/posts`)
            if (!response.ok) throw new Error('Failed to fetch user posts')
            const data = await response.json()
            setPosts(data)
        } catch (error) {
            console.error('Error fetching user posts:', error)
        }
    }

    const handleFollowToggle = async () => {
        try {
            const endpoint = isFollowing ? 'unfollow' : 'follow'
            const response = await fetch(`https://flask-journal-82cu.onrender.com/users/${id}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) throw new Error(`Failed to ${endpoint} user`)
            setIsFollowing(!isFollowing)
            // You might want to update the follower count here
        } catch (error) {
            console.error(`Error ${isFollowing ? 'unfollowing' : 'following'} user:`, error)
        }
    }

    if (!user) return <div>Loading...</div>

    return (
        <>
        <Navbar/>
        <div className='profile'>
            <div className="profile-header">
                <div className="profile-image">
                    {user.avatar ? <img src={user.avatar} alt={user.username} /> : <Person/>}
                </div>
                <div className="profile-info">
                    <h1>{user.username}</h1>
                    <p>{user.email}</p>
                    <div className="buttons">
                        <button onClick={handleFollowToggle}>
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="stats">
                <div className="stat">
                    <p className='icon'><CardList/></p>
                    <p>{posts.length}</p>
                </div>
                <div className="stat">
                    <p className='icon'><PersonFillDown/></p>
                    <p>{user.followers_count}</p>
                </div>
                <div className="stat">
                    <p className='icon'><PersonFillUp/></p>
                    <p>{user.following_count}</p>
                </div>
                <div className="stat">
                    <p className='icon'><ChatDots/></p>
                    <p>{user.comments_count || 0}</p>
                </div>
            </div>
            <div className='global-posts'>
                {posts.map((post) => (
                    <GlobalPostCard key={post.id} posts={post} />
                ))}
            </div>
        </div>
        </>
    )
}

export default Profile
