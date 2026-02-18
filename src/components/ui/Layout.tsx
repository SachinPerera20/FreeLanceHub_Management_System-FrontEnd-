import React from 'react';
import { Header } from './Header';
interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({
  children
}: LayoutProps) {
  return <div className="min-h-screen bg-black flex flex-col text-white selection:bg-[#f97316] selection:text-white">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
      <footer className="border-t border-[#222222] bg-black py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-[#444444] text-sm">
          <p className="font-medium">
            &copy; {new Date().getFullYear()} UniFreelancer.
          </p>
          <p className="mt-2">
            Connecting Sri Lankan university talent with opportunities.
          </p>
        </div>
      </footer>
    </div>;
}