import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/FormControls';
export function NotFound() {
  return <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-9xl font-bold text-teal-900/20">404</h1>
      <h2 className="text-3xl font-bold text-white mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-2 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>;
}