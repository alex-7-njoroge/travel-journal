import React, { useEffect, useState } from 'react'
import GlobalPostCard from './GlobalPostCard'
import Navbar from './Navbar'
import styles from './GlobalPosts.module.css'

function GlobalPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchGlobalPosts()
    }, [])

    const fetchGlobalPosts = async () => {
        try {
            const response = await fetch('https://flask-journal-82cu.onrender.com/posts')
            if (!response.ok) {
                throw new Error('Failed to fetch posts')
            }
            const data = await response.json()
            setPosts(data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching posts:', error)
            setError('Failed to load posts. Please try again later.')
            setLoading(false)
        }
    }

    if (loading) {
        return <div className={styles.loading}>Loading posts...</div>
    }

    if (error) {
        return <div className={styles.error}>{error}</div>
    }

    return (
        <div className={styles.globalPostsContainer}>
            <Navbar />
            <div className={styles.globalPosts}>
                <h1 className={styles.title}>Global Posts</h1>
                <div className={styles.postsGrid}>
                    {posts.map((post) => (
                        <GlobalPostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GlobalPosts
