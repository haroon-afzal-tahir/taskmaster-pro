/* eslint-disable react-refresh/only-export-components */
import { API } from "@/config/axios";
import { User } from "@/models/User";
import { CookieHelper } from "@/utils/cookie";
import { AxiosError } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext<AuthContextProps>({ user: null, logout: () => {}, setUser: () => { } });

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [user, setUser] = useState<User | null>(null);
  const logout = async () => {
    try {
      if (!CookieHelper.getCookie('token')) {
        toast.error('You are not logged in');
      }

      const { data } = await API.get('/auth/logout');
      CookieHelper.deleteCookie('token');
      toast.success(data.message);
      setUser(null);
    } catch (error) {
      if ((error as AxiosError)?.response) {
        const errorMessage = (error as AxiosError<{ message: string }>)?.response?.data.message || 'An error occurred. Please try again later.';
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  }

  useEffect(() => {
    try {
      if (CookieHelper.getCookie('token')) {
        const user = localStorage.getItem('user');
        if (user) {
          setUser(JSON.parse(user));
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const value: AuthContextProps = {
    setUser,
    user,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext<AuthContextProps>(AuthContext);
