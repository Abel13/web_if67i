import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@if67i:token');
    const user = localStorage.getItem('@if67i:user');

    if (token && user) {
      return { token, user: JSON.parse(user), loading: false };
    }

    return {};
  });

  const signOut = useCallback(async () => {
    localStorage.removeItem('@if67i:token');
    localStorage.removeItem('@if67i:user');

    setData({});
  }, []);

  const updateUser = useCallback(async (userData) => {
    setData({ ...data, loading: true });
    localStorage.setItem('@if67i:user', JSON.stringify(userData));

    setData({ ...data, user: userData, loading: false });
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    setData({ token: '', user: {}, loading: true });
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, user } = response.data;
    console.log(response.data.token);

    localStorage.setItem('@if67i:token', token);
    localStorage.setItem('@if67i:user', JSON.stringify(user));

    setData({ token: token, user, loading: false });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading: data.loading,
        user: data.user,
        token: data.token,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
