"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="main-navbar">
      <h2>Car Showroom</h2>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      <nav className={menuOpen ? "nav-open" : ""}>
        <a href="/" onClick={() => setMenuOpen(false)}>
          Home
        </a>
        <a href="/cars" onClick={() => setMenuOpen(false)}>
          Cars
        </a>
        <a href="/about" onClick={() => setMenuOpen(false)}>
          About
        </a>
        <a href="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </a>
      </nav>
    </header>
  );
}
