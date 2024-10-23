import {create} from 'zustand'

export const usePostsStore = create((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),
}))