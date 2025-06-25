import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
  <div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://plus.unsplash.com/premium_photo-1683309568772-57011d6c1b7b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Plan. Prioritize. Progress.</h1>
      <p className="mb-5">
        Stay on top of your tasks with a simple, powerful todo list. Let’s make productivity easy.
      </p>
      <Link to="/todo">
      <button className="btn btn-primary">Get Started</button>
      </Link>
    </div>
  </div>
</div>
) 
 }


export default Hero