import React from 'react'
import { useEffect, useState } from 'react'
import { Person, CardList, PersonFillDown, PersonFillUp, ChatDots } from 'react-bootstrap-icons'
import Navbar from './Navbar'

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem('token')
      if (!token) {
        setError("No token found. Please log in.")
        setIsLoading(false)
        return
      }
  
      try {
        const res = await fetch('https://demo-flask-app-1kry.onrender.com/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
  
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`)
        }
  
        const data = await res.json()
        setUserProfile(data)
      } catch (error) {
        console.error('Error fetching user profile:', error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchUserData()
  }, [])
  
  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>Error: {error}</h1>
  if (!userProfile) return <h1>No user data found</h1>

  return (
    <>
      <Navbar />
      <div className='profile'>
        <div className="profile-header">
          <div className="profile-image">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt={userProfile.username} />
            ) : (
              <Person size={80} />
            )}
          </div>
          <div className="profile-info">
            <h1>{userProfile.username}</h1>
            <p>{userProfile.email}</p>
            {userProfile.bio && <p>{userProfile.bio}</p>}
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <p className='icon'><CardList /></p>
            <p>{userProfile.posts_count || 0}</p>
            <p>Posts</p>
          </div>
          <div className="stat">
            <p className='icon'><PersonFillDown /></p>
            <p>{userProfile.followers_count || 0}</p>
            <p>Followers</p>
          </div>
          <div className="stat">
            <p className='icon'><PersonFillUp /></p>
            <p>{userProfile.following_count || 0}</p>
            <p>Following</p>
          </div>
          <div className="stat">
            <p className='icon'><ChatDots /></p>
            <p>{userProfile.comments_count || 0}</p>
            <p>Comments</p>
          </div>
        </div>
        {userProfile.location && (
          <div className="location">
            <p>Location: {userProfile.location}</p>
          </div>
        )}
        {userProfile.joined_date && (
          <div className="joined-date">
            <p>Joined: {new Date(userProfile.joined_date).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default UserProfile
