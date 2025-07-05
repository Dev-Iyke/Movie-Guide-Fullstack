import { useState, useEffect } from 'react';
import { AuthContext } from './features';
import { useNavigate } from 'react-router-dom';

// export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => {
    const storedData = localStorage.getItem('authToken');
    if (!storedData) {
      navigate('/')
      return null;
    } 
    try {
      const { value, expiry } = JSON.parse(storedData);
      if (expiry && Date.now() > expiry) {
        localStorage.removeItem('authToken');
        navigate('/login');
        return null;
      }
      return value;
    } catch {
      localStorage.removeItem('authToken');
      navigate('/')
      return null;
    }
  });

  useEffect(() => {
    if(!token){
      console.log('no token')
      navigate('/')
    }
  }, [token]);

  const [user, setUser] = useState(null);
  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      // Set expiry to 1 day from now
      const expiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("authToken", JSON.stringify({ value: token, expiry }));
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  console.log(isAuthenticated)
  console.log(user)

  // Fetch user when token exists
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        } else {
          logout();
        }
      } catch (err) {
        console.error(err);
        logout();
      }
    };

    if (token) fetchUser();
  }, [token]);


  const logout = () => {
    setToken(null);
    setUser(null)
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, setToken, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;