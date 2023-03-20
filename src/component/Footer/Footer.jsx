import React, { useState, useEffect } from "react";
import "./Footer.css";
const Footer = () => {
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      <div className="container">
        <p>Copyright &copy; {currentYear} Global Vox. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
