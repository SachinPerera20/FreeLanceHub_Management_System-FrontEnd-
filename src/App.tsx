//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'

import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';


function App() {
  const { user, token } = useAuth();

  useEffect(() => {
    console.log('Auth debug:', { user, token });
  }, [user, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">
        Freelance Platform MVP 
      </h1>
    </div>
  );
}

export default App;

