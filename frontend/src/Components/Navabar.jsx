import { Clipboard } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100" data-theme="luxury">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl md:text-4xl font-extrabold ml-2 sm:ml-6">
          TODOLIST <Clipboard size={32} className="ml-2" />
        </Link>
      </div>

      {/* Dropdown menu for mobile */}
      <div className="flex-none lg:hidden">
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/todo">Todo</Link></li>
          </ul>
        </div>
      </div>

      {/* Large screens */}
      <div className="hidden lg:flex gap-8 font-semibold text-lg mr-10">
        <Link to="/" className="hover:text-primary">Home</Link>
        <Link to="/about" className="hover:text-primary">About</Link>
        <Link to="/todo" className="hover:text-primary">Todo</Link>
      </div>

      {/* Clerk Authentication */}
      <div className="flex-none gap-2 mr-4">
        {/* When Signed Out → Show Sign In button */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn btn-primary">Sign In</button>
          </SignInButton>
        </SignedOut>

        {/* When Signed In → Show Clerk's User Button (has sign-out built-in) */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
