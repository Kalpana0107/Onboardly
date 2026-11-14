import React, { createContext, useState, useEffect, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';
import { API_BASE_URL } from '../api/config';

const AuthContext = createContext(null);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  
  // Keep loading true initially if there is an OAuth callback in the URL to prevent premature redirect
  const hasOAuthCallback = typeof window !== 'undefined' && (
    window.location.hash.includes('access_token') ||
    window.location.search.includes('code=')
  );
  const [loading, setLoading] = useState(true);

  // Helper to sync Google user with backend or local fallback
  const syncGoogleUser = async (supaUser, sessionAccessToken) => {
    const fullName = supaUser.user_metadata?.full_name || supaUser.user_metadata?.name || supaUser.email?.split('@')[0] || 'User';
    const email = supaUser.email;
    const fallbackUser = {
      id: supaUser.id,
      fullName,
      email,
      role: 'employee',
    };
    const fallbackToken = sessionAccessToken || supaUser.id;

    try {
      // 1. Try dedicated Google OAuth sync endpoint
      const syncRes = await fetch(`${API_BASE_URL}/auth/google-sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          fullName,
          role: 'employee'
        })
      });

      if (syncRes.ok) {
        const data = await syncRes.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return data.user;
      }

      // 2. Fallback to register / login if syncRes fails
      const registerRes = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          password: supaUser.id,
          role: 'employee',
        }),
      });

      if (registerRes.ok) {
        const data = await registerRes.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return data.user;
      }

      const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: supaUser.id,
        }),
      });

      if (loginRes.ok) {
        const data = await loginRes.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return data.user;
      }
    } catch (err) {
      console.warn('Backend sync failed, using authenticated Supabase session:', err);
    }

    // 3. Resilient fallback: activate session with Supabase data so user is not stuck
    localStorage.setItem('token', fallbackToken);
    localStorage.setItem('user', JSON.stringify(fallbackUser));
    setToken(fallbackToken);
    setUser(fallbackUser);
    return fallbackUser;
  };

  useEffect(() => {
    // Synchronize stored user state on initial load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse stored user session:', err);
        logout();
      }
    }

    if (!hasOAuthCallback) {
      setLoading(false);
    }

    // Check existing Supabase session or listen for auth state changes
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user && !storedToken) {
          syncGoogleUser(session.user, session.access_token).finally(() => setLoading(false));
        } else if (hasOAuthCallback && !session) {
          setLoading(false);
        }
      }).catch(() => setLoading(false));

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user) {
            try {
              await syncGoogleUser(session.user, session.access_token);
            } finally {
              setLoading(false);
            }
          } else if (event === 'SIGNED_OUT') {
            logout();
            setLoading(false);
          }
        }
      );

      return () => subscription?.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Login failed.');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data.user;
  };

  const register = async (nameOrData, email, password, role = 'employee') => {
    let payload = {};
    if (typeof nameOrData === 'object' && nameOrData !== null) {
      payload = {
        name: nameOrData.name,
        email: nameOrData.email,
        password: nameOrData.password,
        role: nameOrData.role || 'employee'
      };
    } else {
      payload = { name: nameOrData, email, password, role };
    }

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Registration failed.');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data.user;
  };

  const loginWithGoogle = async () => {
    if (!supabase) {
      throw new Error('Supabase client is not configured in environment variables.');
    }

    // Always redirect back to current origin login
    const redirectTo = `${window.location.origin}/login`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) throw error;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    if (supabase) {
      supabase.auth.signOut().catch(() => {});
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
