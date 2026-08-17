import React, { createContext, useState, useEffect, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';

const AuthContext = createContext(null);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://smarthire-backend-ysya.onrender.com/api';

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
    setLoading(false);

    // Listen for Supabase auth state changes (Google OAuth callback)
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            const supaUser = session.user;
            try {
              // Try to register the Google user with our backend
              // If they already exist, fall back to login
              const registerRes = await fetch(`${apiBaseUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name: supaUser.user_metadata?.full_name || supaUser.email?.split('@')[0] || 'User',
                  email: supaUser.email,
                  password: supaUser.id, // Use Supabase UID as password for OAuth users
                  role: 'employee',
                }),
              });

              let data;
              if (registerRes.ok) {
                data = await registerRes.json();
              } else {
                // User likely already exists, try login
                const loginRes = await fetch(`${apiBaseUrl}/auth/login`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: supaUser.email,
                    password: supaUser.id,
                  }),
                });
                if (!loginRes.ok) {
                  console.error('Google auth: backend sync failed');
                  return;
                }
                data = await loginRes.json();
              }

              localStorage.setItem('token', data.token);
              localStorage.setItem('user', JSON.stringify(data.user));
              setToken(data.token);
              setUser(data.user);
            } catch (err) {
              console.error('Error syncing Google user with backend:', err);
            }
          }
        }
      );

      return () => subscription?.unsubscribe();
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${apiBaseUrl}/auth/login`, {
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

    const response = await fetch(`${apiBaseUrl}/auth/register`, {
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

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) throw error;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
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