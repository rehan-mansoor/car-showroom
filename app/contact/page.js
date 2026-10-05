"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError("");
    setSubmitted(true);

    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">
      {/* Hero */}

      <section className="contact-hero">
        <div className="contact-hero-content">
          <p className="contact-label">GET IN TOUCH</p>

          <h1>Let’s Talk About Your Next Car</h1>

          <p>
            Have a question about a vehicle or want to know more? Send us a
            message and our team will get back to you.
          </p>
        </div>
      </section>

      {/* Contact Section */}

      <section className="contact-section">
        <div className="contact-info">
          <p className="contact-section-label">CONTACT US</p>

          <h2>We’re Here To Help</h2>

          <p className="contact-intro">
            Whether you have a question about a car, need more information, or
            simply want to get in touch, feel free to contact us.
          </p>

          <div className="contact-details">
            <div className="contact-detail">
              <span className="contact-icon">01</span>

              <div>
                <h3>Phone</h3>
                <p>+1 234 567 890</p>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-icon">02</span>

              <div>
                <h3>Email</h3>
                <p>info@carshowroom.com</p>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-icon">03</span>

              <div>
                <h3>Showroom</h3>
                <p>123 Main Street, New York, USA</p>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-icon">04</span>

              <div>
                <h3>Opening Hours</h3>
                <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}

        <div className="contact-form-box">
          <p className="contact-section-label">SEND A MESSAGE</p>

          <h2>How Can We Help?</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  placeholder="Enter your phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Subject</label>

              <input
                type="text"
                placeholder="What would you like to know?"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subject: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Message</label>

              <textarea
                rows="6"
                placeholder="Write your message..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <button type="submit">Send Message</button>
          </form>

          {error && <p className="error-message">{error}</p>}

          {submitted && (
            <p className="success-message">
              Your message has been sent successfully.
            </p>
          )}
        </div>
      </section>

      {/* Showroom Section */}

      <section className="showroom-section">
        <div className="showroom-content">
          <p className="contact-section-label">VISIT OUR SHOWROOM</p>

          <h2>Find Your Next Car In Person</h2>

          <p>
            Explore our vehicles, ask questions, and get the information you
            need before making your decision.
          </p>

          <a href="/cars" className="showroom-button">
            Explore Cars
          </a>
        </div>

        <div className="showroom-image">
          <img src="/Kia-SUV/main.jpg" alt="Kia Sportage" />
        </div>
      </section>

      {/* CTA */}

      <section className="contact-cta">
        <p className="contact-label">START EXPLORING</p>

        <h2>Still Looking For The Right Car?</h2>

        <p>
          Browse our collection and discover vehicles that match your needs.
        </p>

        <a href="/cars" className="cta-button">
          Browse Our Cars
        </a>
      </section>
    </main>
  );
}
