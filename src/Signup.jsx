// // src/pages/Signup.jsx
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API = "https://jwt-v7o1.onrender.com";

// export default function Signup() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const signup = async () => {
//     try {
//       await axios.post(`${API}/signup`, { username, password });
//       setMessage("Signup successful ✅");
//       setTimeout(() => navigate('/login'), 1000); // ⏭ Redirect to login
//     } catch (err) {
//       setMessage("Signup failed ❌");
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
//       <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
//       <button onClick={signup}>Signup</button>
//       <p>{message}</p>
//     </div>
//   );
// }

// src/pages/Signup.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = "https://jwt-v7o1.onrender.com";

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !password) {
      setMessage("Please fill both fields ❗");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API}/signup`, { username, password });
      setMessage("Signup successful ✅ Redirecting to login...");
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setMessage("Signup failed ❌: " + (error.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Enter Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>
      <p>{message}</p>
    </div>
  );
}
