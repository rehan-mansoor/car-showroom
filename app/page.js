import { cars } from "./data/cars";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <h1>Find Your Dream Car</h1>

        <p>
          Explore our collection of quality cars and find the perfect one for
          you.
        </p>

        <a href="/cars" className="hero-button">
          Explore Cars
        </a>
      </section>

      {/* Featured Cars Section */}
      <section className="featured">
        <h2>Featured Cars</h2>

        <p>Discover some of our most popular cars.</p>

        <div className="car-grid">
          {cars
            .filter((car) => car.featured)
            .slice(0, 6)
            .map((car) => (
              <div className="car-card" key={car.id}>
                <div className="car-image">
                  <img src={car.images[0]} alt={`${car.brand} ${car.model}`} />
                </div>

                <h3>
                  {car.brand} {car.model}
                </h3>

                <p>{car.year}</p>

                <p>{car.mileage.toLocaleString()} mi</p>

                <h4>${car.price.toLocaleString()}</h4>

                <a href={`/cars/${car.id}`} className="details-button">
                  View Details
                </a>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
