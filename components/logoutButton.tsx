// components/LogoutButton.tsx
import { useState } from 'react';

interface LogoutButtonProps {
  onLogout: () => void;
  sessionToken: string; 
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout, sessionToken }) => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionToken,
        }),
      });

      if (response.ok) {
        onLogout();
      } else {
        alert('Logout failed');
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-500 rounded-md">
      Logout
    </button>
  );
};

export default LogoutButton;
