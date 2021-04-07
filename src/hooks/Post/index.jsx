import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../../services/api';

const PostContext = createContext({});

export const PostProvider= ({ children }) => {
  const [data, setData] = useState({});

  const getPosts = useCallback(async () => {
    setData({ ...data, loading: true });
    const response = await api.get('posts');

    const posts = response.data;
    setData({ posts, loading: false });
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts: data.posts,
        getPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export function usePost() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}