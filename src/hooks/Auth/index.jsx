import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@if67i:token');
    const user = localStorage.getItem('@if67i:user');

    if (token && user) {
      api.defaults.headers.common = { Authorization: `bearer ${token}` };
      return { user: JSON.parse(user), loading: false };
    }
    
    delete api.defaults.headers.common.Authorization;
    return {user: null};
  });

  const signOut = useCallback(async () => {
    localStorage.removeItem('@if67i:token');
    localStorage.removeItem('@if67i:user');

    delete api.defaults.headers.common.Authorization;
    setData({user: null});
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    setData({ user: null, loading: true });
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    if (token && user) {
      
      localStorage.setItem('@if67i:token', token);
      localStorage.setItem('@if67i:user', JSON.stringify(user));
      
      api.defaults.headers.common = { Authorization: `bearer ${token}` };
      setData({ user, loading: false });
    }
    else {

      delete api.defaults.headers.common.Authorization;
      setData({user: null});
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading: data.loading,
        user: data.user,
        token: data.token,
        signIn,
        signOut,
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
