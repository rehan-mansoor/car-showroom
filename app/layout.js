import Navbar from "../components/navbar";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Car Showroom",
  description: "Find Your Next Car",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Navbar />

        {children}

        <footer className="footer">
          <div className="footer-container">
            <div className="footer-about">
              <h3>Car Showroom</h3>
              <p>
                Find your next car from our collection of quality and reliable
                vehicles.
              </p>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <a href="/">Home</a>
              <a href="/cars">Cars</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </div>

            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>info@carshowroom.com</p>
              <p>+1 234 567 890</p>
              <p>123 Main Street, New York</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Car Showroom. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
