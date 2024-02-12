// components/LoginForm.js
import { useState } from 'react';

interface LoginFormProps {
  onLogin: (sessionToken: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const encodedPassword = btoa(password);

      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password: encodedPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(data.sessionToken);
      } else {
        alert('Login failed');
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <label className="block mb-2 text-sm font-semibold text-gray-600">Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      <label className="block mb-2 text-sm font-semibold text-gray-600">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      <button onClick={handleLogin} className="w-full px-4 py-2 text-white bg-blue-500 rounded-md">
        Login
      </button>
    </div>
  );
};

export default LoginForm;
