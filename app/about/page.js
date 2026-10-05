export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-label">ABOUT CAR SHOWROOM</p>

          <h1>Drive With Confidence</h1>

          <p>
            Discover quality vehicles from trusted brands and find a car that
            fits your lifestyle, needs, and budget.
          </p>

          <a href="/cars" className="about-hero-button">
            Explore Our Cars
          </a>
        </div>
      </section>

      <section className="about-stats">
        <div className="stat">
          <h2>10+</h2>
          <p>Vehicles Available</p>
        </div>

        <div className="stat">
          <h2>9+</h2>
          <p>Trusted Brands</p>
        </div>

        <div className="stat">
          <h2>100%</h2>
          <p>Customer Focused</p>
        </div>

        <div className="stat">
          <h2>24/7</h2>
          <p>Online Browsing</p>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story-image">
          <img src="/Mercedes-sedan/main.jpg" alt="Mercedes-Benz vehicle" />
        </div>

        <div className="about-story-content">
          <p className="about-section-label">WHO WE ARE</p>

          <h2>A Better Way To Find Your Next Car</h2>

          <p>
            Car Showroom is a modern vehicle showroom designed to make the
            car-searching experience simple, clear, and convenient.
          </p>

          <p>
            We bring vehicles from trusted brands together in one place so
            visitors can easily explore different options and compare important
            vehicle information.
          </p>

          <p>
            Whether you need a reliable daily driver, a family SUV, or a
            performance-focused vehicle, our goal is to help you find an option
            that suits your needs.
          </p>

          <a href="/cars" className="story-button">
            View Available Cars
          </a>
        </div>
      </section>

      <section className="why-us">
        <div className="section-heading">
          <p className="about-section-label">WHY CHOOSE US</p>

          <h2>Everything You Need To Find The Right Car</h2>

          <p>
            We keep the car-search process straightforward, informative, and
            easy to explore.
          </p>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-number">01</div>

            <h3>Quality Vehicles</h3>

            <p>
              Explore a carefully selected collection of vehicles from
              well-known automotive brands.
            </p>
          </div>

          <div className="why-card">
            <div className="why-number">02</div>

            <h3>Clear Information</h3>

            <p>
              View important details such as price, mileage, year, transmission,
              fuel type, and more.
            </p>
          </div>

          <div className="why-card">
            <div className="why-number">03</div>

            <h3>Easy Browsing</h3>

            <p>
              Search and explore available vehicles through a clean and
              responsive showroom experience.
            </p>
          </div>

          <div className="why-card">
            <div className="why-number">04</div>

            <h3>Customer Focused</h3>

            <p>
              Our goal is to make finding and inquiring about your next vehicle
              simple and convenient.
            </p>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div>
          <p className="about-section-label">READY TO GET STARTED?</p>

          <h2>Find A Car That Fits Your Journey</h2>

          <p>Explore our collection and discover your next vehicle.</p>
        </div>

        <a href="/cars" className="cta-button">
          Browse Cars
        </a>
      </section>
    </main>
  );
}
