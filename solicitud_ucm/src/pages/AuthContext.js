import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(res => {
        if (res.data.Status === "Success") {
          setUser({
            userid: res.data.userid,
            username: res.data.username,
            useremail: res.data.useremail,
            usertype: res.data.usertype,
            userCarrera: res.data.userCarrera
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setUser(null);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
