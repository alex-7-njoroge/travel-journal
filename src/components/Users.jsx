import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import Navbar from './Navbar'
import './UserList.css'


function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://flask-journal-82cu.onrender.com/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error)
      setError('Failed to load users. Please try again later.')
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading users...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="users-page">
      <Navbar />
      <div className="users-container">
        <h1 className="users-title">Community Members</h1>
        <div className="user-list">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Users
