import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export default function ProtectedRoute({ children }) {
  const [valid, setValid] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) return setValid(false);
      try {
        await axios.get(`${API}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setValid(true);
      } catch {
        setValid(false);
      }
    };
    checkToken();
  }, []);

  if (valid === null) return <p>Loading...</p>;
  if (!valid) return <Navigate to="/login" replace />;
  return children;
}
