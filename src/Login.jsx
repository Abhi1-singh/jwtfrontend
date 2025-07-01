// // src/pages/Login.jsx
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API = "https://jwt-v7o1.onrender.com";

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const login = async () => {
//     try {
//       const res = await axios.post(`${API}/login`, { username, password });
//       localStorage.setItem("token", res.data.token);
//       setMessage("Login successful ✅");
//       setTimeout(() => navigate('/dashboard'), 1000); // ⏭ Redirect to dashboard
//     } catch (err) {
//       setMessage("Login failed ❌");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
//       <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
//       <button onClick={login}>Login</button>
//       <p>{message}</p>
//     </div>
//   );
// }

// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = "https://jwt-v7o1.onrender.com";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Please enter both email and password ❗");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API}/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      setMessage("Login successful ✅");
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setMessage("Login failed ❌: " + (error.response?.data?.error || "Server error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter Email"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <p>{message}</p>
    </div>
  );
}
