// pages/index.tsx

import ImageUploadForm from '@/components/imageUploadForm';
import LoginForm from '@/components/loginForm';
import LogoutButton from '@/components/logoutButton';
import SignupForm from '@/components/signupForm';
import { useState } from 'react';

const Home = () => {
  const [sessionToken, setSessionToken] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleLogin = async (newSessionToken: string) => {
    setSessionToken(newSessionToken);
    setShowLoginForm(false);
    setShowSignupForm(false);
  };

  const handleLogout = async () => {
    try {
      setSessionToken('');
      setShowLoginForm(true);
      setShowSignupForm(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleSignup = async (userId: string) => {
    console.log(`User with ID ${userId} signed up successfully.`);
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const showImageUploadAndLogout = sessionToken && !showLoginForm && !showSignupForm;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold mb-8">Blinkit Auth Assignment</h1>

      {showLoginForm && (
        <div className="space-y-8 text-center">
          <h1 className="text-3xl font-semibold mb-4">Login</h1>
          <LoginForm onLogin={handleLogin} />
          <button onClick={() => setShowSignupForm(true)} className="text-blue-500 underline">
            Signup
          </button>
        </div>
      )}

      {showSignupForm && (
        <div className="space-y-8 text-center">
          <h1 className="text-3xl font-semibold mb-4">Signup</h1>
          <SignupForm onSignup={handleSignup} />
        </div>
      )}

      {showImageUploadAndLogout && (
        <div className="space-y-8 text-center">
          <h1 className="text-3xl font-semibold mb-4">Actions</h1>
          <ImageUploadForm sessionToken={sessionToken} />
          <LogoutButton onLogout={handleLogout} sessionToken={sessionToken} />
        </div>
      )}
    </div>
  );
};

export default Home;
