import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
  type: 'question' | 'story' | 'resource';
  likes: string[];
  comments: Comment[];
  category: string;
}

interface CommunityState {
  posts: Post[];
  selectedPost: Post | null;
  categories: string[];
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CommunityState = {
  posts: [],
  selectedPost: null,
  categories: ['All', 'Questions', 'Stories', 'Resources'],
  selectedCategory: 'All',
  isLoading: false,
  error: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    addComment: (state, action: PayloadAction<{ postId: string; comment: Comment }>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload.comment);
      }
    },
    toggleLike: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        const likeIndex = post.likes.indexOf(action.payload.userId);
        if (likeIndex === -1) {
          post.likes.push(action.payload.userId);
        } else {
          post.likes.splice(likeIndex, 1);
        }
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setPosts,
  setSelectedPost,
  setSelectedCategory,
  addPost,
  updatePost,
  deletePost,
  addComment,
  toggleLike,
} = communitySlice.actions;
export default communitySlice.reducer; 