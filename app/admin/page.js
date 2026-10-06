"use client";

import { useEffect, useState } from "react";
const API_URL = "https://car-showroom-backend-eight.vercel.app";

export default function Admin() {
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [carsError, setCarsError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/cars`)
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
        setLoadingCars(false);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setCarsError("Unable to load cars. Please try again.");
        setLoadingCars(false);
      });
  }, []);

  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [inquiriesError, setInquiriesError] = useState("");

  useEffect(() => {
    fetch("/admin-api/inquiries")
      .then((response) => response.json())
      .then((data) => {
        setInquiries(data);
        setLoadingInquiries(false);
      })
      .catch((error) => {
        console.error("Error fetching inquiries:", error);
        setInquiriesError("Unable to load inquiries. Please try again.");
        setLoadingInquiries(false);
      });
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showAllCars, setShowAllCars] = useState(false);
  const [showAllInquiries, setShowAllInquiries] = useState(false);

  const [carForm, setCarForm] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "",
    description: "",
    images: "",
    status: "Available",
    featured: false,
  });

  const availableCars = cars.filter((car) => car.status === "Available").length;

  const soldCars = cars.filter((car) => car.status === "Sold").length;

  const handleCarSubmit = async (e) => {
    e.preventDefault();

    if (
      !carForm.brand ||
      !carForm.model ||
      !carForm.year ||
      !carForm.price ||
      !carForm.mileage ||
      !carForm.color ||
      !carForm.description ||
      !carForm.images
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (
      Number(carForm.year) < 1900 ||
      Number(carForm.year) > new Date().getFullYear()
    ) {
      alert("Please enter a valid year.");
      return;
    }

    if (Number(carForm.price) <= 0) {
      alert("Price must be greater than 0.");
      return;
    }

    if (Number(carForm.mileage) < 0) {
      alert("Mileage cannot be negative.");
      return;
    }

    const formattedCar = {
      brand: carForm.brand,
      model: carForm.model,
      year: Number(carForm.year),
      price: Number(carForm.price),
      mileage: Number(carForm.mileage),
      transmission: carForm.transmission,
      fuelType: carForm.fuelType,
      color: carForm.color,
      description: carForm.description,
      images: carForm.images.split(",").map((image) => image.trim()),
      status: carForm.status,
      featured: carForm.featured,
    };

    try {
      let response;

      if (editingCar) {
        response = await fetch(`/admin-api/cars/${editingCar.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedCar),
        });
      } else {
        response = await fetch("/admin-api/cars", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedCar),
        });
      }

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText);
      }

      const data = responseText ? JSON.parse(responseText) : {};

      if (editingCar) {
        setCars(
          cars.map((car) =>
            car.id === editingCar.id
              ? {
                  ...car,
                  ...formattedCar,
                }
              : car,
          ),
        );
      } else {
        const newCar = {
          id: data.carId,
          ...formattedCar,
        };

        setCars([...cars, newCar]);
      }

      setCarForm({
        brand: "",
        model: "",
        year: "",
        price: "",
        mileage: "",
        transmission: "Automatic",
        fuelType: "Petrol",
        color: "",
        description: "",
        images: "",
        status: "Available",
        featured: false,
      });

      setEditingCar(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);

    setCarForm({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      transmission: car.transmission,
      fuelType: car.fuelType,
      color: car.color,
      description: car.description,
      images: Array.isArray(car.images) ? car.images.join(", ") : car.images,
      status: car.status,
      featured: Boolean(car.featured),
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`/admin-api/cars/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleStatusChange = async (id) => {
    const car = cars.find((item) => item.id === id);

    const newStatus = car.status === "Available" ? "Sold" : "Available";

    try {
      const response = await fetch(`/admin-api/cars/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setCars(
        cars.map((item) =>
          item.id === id
            ? {
                ...item,
                status: newStatus,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Error updating car status:", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCar(null);

    setCarForm({
      brand: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      transmission: "Automatic",
      fuelType: "Petrol",
      color: "",
      description: "",
      images: "",
      status: "Available",
      featured: false,
    });
  };

  const handleInquiryStatus = async (id) => {
    const inquiry = inquiries.find((item) => item.id === id);

    const newStatus = inquiry.status === "New" ? "Contacted" : "New";

    try {
      const response = await fetch(`/admin-api/inquiries/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setInquiries(
        inquiries.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (error) {
      console.error("Error updating inquiry status:", error);
    }
  };

  const displayedCars = showAllCars ? cars : cars.slice(0, 5);
  const displayedInquiries = showAllInquiries
    ? inquiries
    : inquiries.slice(0, 3);

  return (
    <main className="admin-page">
      {/* Admin Header */}

      <section className="admin-header">
        <div>
          <p className="admin-label">ADMIN PANEL</p>

          <h1>Dashboard</h1>

          <p>Manage your vehicles and customer inquiries.</p>
        </div>

        <button
          className="add-car-button"
          onClick={() => {
            setEditingCar(null);
            setShowForm(true);
          }}
        >
          + Add New Car
        </button>
      </section>

      {/* Add / Edit Car Form */}

      {showForm && (
        <section className="admin-form-box">
          <div className="admin-section-header">
            <div>
              <p className="admin-section-label">
                {editingCar ? "EDIT VEHICLE" : "NEW VEHICLE"}
              </p>

              <h2>{editingCar ? "Edit Car" : "Add New Car"}</h2>
            </div>
          </div>

          <form onSubmit={handleCarSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Brand</label>

                <input
                  type="text"
                  value={carForm.brand}
                  placeholder="Toyota"
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      brand: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Model</label>

                <input
                  type="text"
                  value={carForm.model}
                  placeholder="Camry"
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      model: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Year</label>

                <input
                  type="number"
                  value={carForm.year}
                  placeholder="2024"
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      year: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Price</label>

                <input
                  type="number"
                  placeholder="30000"
                  value={carForm.price}
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      price: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mileage</label>
                <input
                  type="number"
                  value={carForm.mileage}
                  placeholder="18000"
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      mileage: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Color</label>
                <input
                  type="text"
                  value={carForm.color}
                  placeholder="White"
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      color: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Transmission</label>
                <select
                  value={carForm.transmission}
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      transmission: e.target.value,
                    })
                  }
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div className="form-group">
                <label>Fuel Type</label>
                <select
                  value={carForm.fuelType}
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      fuelType: e.target.value,
                    })
                  }
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={carForm.description}
                placeholder="Enter car description"
                rows="4"
                onChange={(e) =>
                  setCarForm({
                    ...carForm,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <div className="form-group">
              <label>Images</label>
              <input
                type="text"
                value={carForm.images}
                placeholder="/Toyota-Camry/main.jpg, /Toyota-Camry/1.jpg"
                onChange={(e) =>
                  setCarForm({
                    ...carForm,
                    images: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={carForm.featured}
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      featured: e.target.checked,
                    })
                  }
                />
                Featured Car
              </label>
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                value={carForm.status}
                onChange={(e) =>
                  setCarForm({
                    ...carForm,
                    status: e.target.value,
                  })
                }
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            <button type="submit">
              {editingCar ? "Update Car" : "Add Car"}
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </section>
      )}

      {/* Stats */}

      <section className="admin-stats">
        <div className="admin-stat">
          <span>Total Cars</span>
          <h2>{cars.length}</h2>
        </div>

        <div className="admin-stat">
          <span>Available</span>
          <h2>{availableCars}</h2>
        </div>

        <div className="admin-stat">
          <span>Sold</span>
          <h2>{soldCars}</h2>
        </div>

        <div className="admin-stat">
          <span>Inquiries</span>
          <h2>{inquiries.length}</h2>
        </div>
      </section>

      {/* Cars Management */}

      <section className="admin-section">
        <div className="admin-section-header">
          <div>
            <p className="admin-section-label">INVENTORY</p>
            <h2>Manage Cars</h2>
          </div>

          <button
            className="secondary-button"
            onClick={() => setShowAllCars(!showAllCars)}
          >
            {showAllCars ? "Show Less" : "View All Cars"}
          </button>
        </div>

        {loadingCars && <p>Loading cars...</p>}

        {carsError && <p className="admin-error">{carsError}</p>}

        <div className="admin-table">
          <div className="table-header">
            <span>Vehicle</span>
            <span>Year</span>
            <span>Price</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {displayedCars.map((car) => (
            <div className="table-row" key={car.id}>
              <div>
                <strong>
                  {car.brand} {car.model}
                </strong>
              </div>

              <span>{car.year}</span>

              <span>${car.price.toLocaleString()}</span>

              <button
                className={`status-badge ${car.status.toLowerCase()}`}
                onClick={() => handleStatusChange(car.id)}
              >
                {car.status}
              </button>

              <div className="table-actions">
                <button onClick={() => handleEdit(car)}>Edit</button>

                <button onClick={() => handleDelete(car.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiries */}

      <section className="admin-section">
        <div className="admin-section-header">
          <div>
            <p className="admin-section-label">CUSTOMER MESSAGES</p>

            <h2>Recent Inquiries</h2>
          </div>

          <button
            className="secondary-button"
            onClick={() => setShowAllInquiries(!showAllInquiries)}
          >
            {showAllInquiries ? "Show Less" : "View All Inquiries"}
          </button>
        </div>

        {loadingInquiries && <p>Loading inquiries...</p>}

        {inquiriesError && <p className="admin-error">{inquiriesError}</p>}

        <div className="admin-table">
          <div className="table-header inquiry-header">
            <span>Customer</span>
            <span>Car</span>
            <span>Date</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {displayedInquiries.map((inquiry) => (
            <div className="table-row inquiry-row" key={inquiry.id}>
              <div>
                <strong>{inquiry.customer}</strong>
              </div>

              <span>{inquiry.car}</span>

              <span>{inquiry.date}</span>

              <button
                className="status-badge"
                onClick={() => handleInquiryStatus(inquiry.id)}
              >
                {inquiry.status}
              </button>

              <button
                className="view-button"
                onClick={() => setSelectedInquiry(inquiry)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Details */}

      {selectedInquiry && (
        <section className="inquiry-details">
          <div>
            <p className="admin-section-label">INQUIRY DETAILS</p>

            <h2>{selectedInquiry.customer}</h2>

            <p>
              <strong>Car:</strong> {selectedInquiry.car}
            </p>

            <p>
              <strong>Date:</strong> {selectedInquiry.date}
            </p>

            <p>
              <strong>Phone:</strong> {selectedInquiry.phone}
            </p>

            <p>
              <strong>Email:</strong> {selectedInquiry.email}
            </p>

            <p>
              <strong>Message:</strong> {selectedInquiry.message}
            </p>

            <button onClick={() => setSelectedInquiry(null)}>Close</button>
          </div>
        </section>
      )}
    </main>
  );
}
