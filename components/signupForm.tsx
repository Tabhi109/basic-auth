// components/SignupForm.tsx
import { useState } from 'react';

interface SignupFormProps {
  onSignup: (id: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const encodedPassword = btoa(password);
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username,
          email,
          password: encodedPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        onSignup(data.id);
      } else {
        alert('Signup failed');
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <label className="block mb-2 text-sm font-semibold text-gray-600">First Name:</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      <label className="block mb-2 text-sm font-semibold text-gray-600">Last Name:</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      <label className="block mb-2 text-sm font-semibold text-gray-600">Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      <label className="block mb-2 text-sm font-semibold text-gray-600">Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      <label className="block mb-2 text-sm font-semibold text-gray-600">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      <button onClick={handleSignup} className="w-full px-4 py-2 text-white bg-green-500 rounded-md">
        Signup
      </button>
    </div>
  );
};

export default SignupForm;
