import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="hero bg-base-200 min-h-screen px-4 py-10">
      <div className="hero-content flex flex-col-reverse lg:flex-row-reverse gap-10 max-w-6xl w-full items-center">
        
        {/* Image Section */}
        <img
          src="https://images.unsplash.com/photo-1641261689141-ee46b8a0470c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm rounded-2xl shadow-xl object-cover"
          alt="Todo App Illustration"
        />

        {/* Text Section */}
        <div className="text-center lg:text-left w-full">
          <h1 className="text-4xl font-extrabold text-primary mb-4">
            About This Todo App 📝
          </h1>

          <p className="text-lg mb-4 leading-relaxed">
            This Todo List App is built to help you stay organized, productive, and stress-free.
            With an intuitive interface and fast performance, you can easily manage your daily tasks,
            set priorities, and keep track of what matters most.
          </p>

          <h2 className="text-2xl font-bold text-secondary mb-2">Meet the Developer 👋</h2>
          <p className="text-md mb-6 leading-relaxed">
            Hi, I'm <span className="font-semibold">Shubham Raj</span>, a passionate developer from BIT Mesra.
            I love building user-friendly web applications that solve real-life problems.
            This project helped me dive deeper into React, Zustand, Tailwind, and RESTful APIs.
          </p>

          <Link to="/todo">
            <button className="btn btn-primary w-full sm:w-auto">Explore Todos</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
