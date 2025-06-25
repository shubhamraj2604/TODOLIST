import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); // cleanup
  }, []);

  const format = (num) => String(num).padStart(2, '0');

  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4 bg-black">
      <aside>
        <p className="text-lg font-mono mb-1">
          {format(time.getHours())} : {format(time.getMinutes())} : {format(time.getSeconds())}
        </p>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by ACME Industries Ltd.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
