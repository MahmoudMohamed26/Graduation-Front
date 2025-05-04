import React, { createContext, useContext, useEffect, useState } from 'react';
import { Axios } from '../API/Axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [user , setUser] = useState([])
  useEffect(() => {

    const fetchData = async () => {
      try{
        const res = await Axios.get('/user')
        setIsAuthenticated(true);
        setUser(res.data);
      }catch(err) {
        setIsAuthenticated(false);
      }finally{
        setAuthChecked(true);
      }
      }
    fetchData()
    }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated , user , setUser , authChecked , setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext };
