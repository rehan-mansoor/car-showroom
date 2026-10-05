"use client";

import { useEffect, useState } from "react";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carsError, setCarsError] = useState("");
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setCarsError("Unable to load cars. Please try again.");
        setLoading(false);
      });
  }, []);

  const filteredCars = cars.filter((car) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      car.brand.toLowerCase().includes(searchText) ||
      car.model.toLowerCase().includes(searchText);

    const matchesBrand = brand === "" || car.brand === brand;

    const matchesPrice =
      priceRange === "" ||
      (priceRange === "under-25000" && car.price < 25000) ||
      (priceRange === "25000-35000" &&
        car.price >= 25000 &&
        car.price <= 35000) ||
      (priceRange === "35000-45000" &&
        car.price > 35000 &&
        car.price <= 45000) ||
      (priceRange === "above-45000" && car.price > 45000);

    return matchesSearch && matchesBrand && matchesPrice;
  });

  return (
    <main>
      <section className="cars-page">
        <h1>Our Cars</h1>
        <p>Explore our collection of available vehicles.</p>

        <div className="filters">
          <input
            type="text"
            placeholder="Search by brand or model"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">All Brands</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Audi">Audi</option>
            <option value="Ford">Ford</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Kia">Kia</option>
            <option value="Tesla">Tesla</option>
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Price Range</option>
            <option value="under-25000">Under $25,000</option>
            <option value="25000-35000">$25,000 - $35,000</option>
            <option value="35000-45000">$35,000 - $45,000</option>
            <option value="above-45000">Above $45,000</option>
          </select>
        </div>

        <div className="cars-grid">
          {loading ? (
            <p>Loading...</p>
          ) : carsError ? (
            <p className="cars-error">{carsError}</p>
          ) : filteredCars.length === 0 ? (
            <p>No cars found. Try a different search or filter.</p>
          ) : (
            filteredCars.map((car) => (
              <div className="car-card" key={car.id}>
                <div className="car-image">
                  <img src={car.images[0]} alt={`${car.brand} ${car.model}`} />
                </div>

                <h3>
                  {car.brand} {car.model}
                </h3>

                <p>Year: {car.year}</p>
                <p>Mileage: {car.mileage.toLocaleString()} mi</p>
                <h4>${car.price.toLocaleString()}</h4>

                <a href={`/cars/${car.id}`} className="details-button">
                  View Details
                </a>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
