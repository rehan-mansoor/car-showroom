"use client";

import { use, useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CarDetails({ params }) {
  const { id } = use(params);

  const [car, setCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carError, setCarError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/cars/${id}`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Car not found");
        }

        if (!response.ok) {
          throw new Error("Unable to load car");
        }

        return response.json();
      })
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching car:", error);
        setCarError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
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

    try {
      const response = await fetch(`${API_URL}/api/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          car_id: car.id,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setError("");
      setSubmitted(true);

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setError("Failed to submit inquiry. Please try again.");
    }
  };

  if (loading) {
    return (
      <main className="page-error">
        <p>Loading...</p>
      </main>
    );
  }

  if (carError) {
    return (
      <main className="page-error">
        <div className="page-error-box">
          <h1>
            {carError === "Car not found"
              ? "Car not found"
              : "Unable to load car"}
          </h1>

          <p>
            {carError === "Car not found"
              ? "The car you are looking for does not exist."
              : "We could not connect to the car service. Please try again later."}
          </p>
        </div>
      </main>
    );
  }

  const currentImage = selectedImage || car.images[0];

  return (
    <main className="details-page">
      <div className="details-container">
        <div className="details-image">
          <img src={currentImage} alt={`${car.brand} ${car.model}`} />

          <div className="image-thumbnails">
            {car.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${car.brand} ${car.model} ${index + 1}`}
                className={selectedImage === image ? "active" : ""}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="details-info">
          <p className="details-brand">{car.brand}</p>

          <h1>{car.model}</h1>

          <h2>${car.price.toLocaleString()}</h2>

          <span className={`status ${car.status.toLowerCase()}`}>
            {car.status}
          </span>

          <div className="car-specs">
            <div>
              <strong>Year</strong>
              <span>{car.year}</span>
            </div>

            <div>
              <strong>Mileage</strong>
              <span>{car.mileage.toLocaleString()} mi</span>
            </div>

            <div>
              <strong>Transmission</strong>
              <span>{car.transmission}</span>
            </div>

            <div>
              <strong>Fuel Type</strong>
              <span>{car.fuelType}</span>
            </div>

            <div>
              <strong>Color</strong>
              <span>{car.color}</span>
            </div>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{car.description}</p>
          </div>
        </div>

        <div className="inquiry-form">
          <h3>Interested in this car?</h3>

          <p>Send us your details and we will contact you.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
            ></textarea>

            <button type="submit">Send Inquiry</button>
          </form>

          {submitted && (
            <p className="success-message">
              Your inquiry has been submitted successfully.
            </p>
          )}

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </main>
  );
}
