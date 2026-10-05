const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Car Showroom Backend is running");
});

app.get("/api/cars", (req, res) => {
  const sql = "SELECT * FROM cars";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching cars:", err);

      return res.status(500).json({
        message: "Failed to fetch cars",
      });
    }

    res.json(results);
  });
});

app.get("/api/cars/:id", (req, res) => {
  const carId = req.params.id;

  const sql = "SELECT * FROM cars WHERE id = ?";

  db.query(sql, [carId], (err, results) => {
    if (err) {
      console.error("Error fetching car:", err);

      return res.status(500).json({
        message: "Failed to fetch car",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.json(results[0]);
  });
});

app.post("/api/inquiries", (req, res) => {
  const { car_id, name, phone, email, message } = req.body;

  if (!car_id || !name || !phone || !email || !message) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const sql = `
    INSERT INTO inquiries
    (car_id, name, phone, email, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [car_id, name, phone, email, message], (err, result) => {
    if (err) {
      console.error("Error saving inquiry:", err);

      return res.status(500).json({
        message: "Failed to save inquiry",
      });
    }

    res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiryId: result.insertId,
    });
  });
});

app.get("/api/inquiries", (req, res) => {
  const sql = `
    SELECT
      inquiries.id,
      inquiries.name AS customer,
      CONCAT(cars.brand, ' ', cars.model) AS car,
      inquiries.created_at AS date,
      inquiries.status,
      inquiries.phone,
      inquiries.email,
      inquiries.message
    FROM inquiries
    JOIN cars ON inquiries.car_id = cars.id
    ORDER BY inquiries.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching inquiries:", err);

      return res.status(500).json({
        message: "Failed to fetch inquiries",
      });
    }

    res.json(results);
  });
});

app.patch("/api/inquiries/:id/status", (req, res) => {
  const inquiryId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      message: "Status is required",
    });
  }

  const sql = "UPDATE inquiries SET status = ? WHERE id = ?";

  db.query(sql, [status, inquiryId], (err, result) => {
    if (err) {
      console.error("Error updating inquiry status:", err);

      return res.status(500).json({
        message: "Failed to update inquiry status",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Inquiry not found",
      });
    }

    res.json({
      message: "Inquiry status updated successfully",
    });
  });
});

app.post("/api/cars", (req, res) => {
  const {
    brand,
    model,
    year,
    price,
    mileage,
    transmission,
    fuelType,
    color,
    description,
    images,
    status,
    featured,
  } = req.body;

  if (
    !brand ||
    !model ||
    !year ||
    !price ||
    !mileage ||
    !transmission ||
    !fuelType ||
    !color ||
    !description ||
    !images ||
    !status
  ) {
    return res.status(400).json({
      message: "All required car fields are required",
    });
  }

  const sql = `
    INSERT INTO cars
    (
      brand,
      model,
      year,
      price,
      mileage,
      transmission,
      fuelType,
      color,
      description,
      images,
      status,
      featured
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      brand,
      model,
      year,
      price,
      mileage,
      transmission,
      fuelType,
      color,
      description,
      JSON.stringify(images),
      status,
      featured || false,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding car:", err);

        return res.status(500).json({
          message: "Failed to add car",
        });
      }

      res.status(201).json({
        message: "Car added successfully",
        carId: result.insertId,
      });
    },
  );
});

app.put("/api/cars/:id", (req, res) => {
  const carId = req.params.id;

  const {
    brand,
    model,
    year,
    price,
    mileage,
    transmission,
    fuelType,
    color,
    description,
    images,
    status,
    featured,
  } = req.body;

  if (
    !brand ||
    !model ||
    !year ||
    !price ||
    !mileage ||
    !transmission ||
    !fuelType ||
    !color ||
    !description ||
    !images ||
    !status
  ) {
    return res.status(400).json({
      message: "All required car fields are required",
    });
  }

  const sql = `
    UPDATE cars
    SET
      brand = ?,
      model = ?,
      year = ?,
      price = ?,
      mileage = ?,
      transmission = ?,
      fuelType = ?,
      color = ?,
      description = ?,
      images = ?,
      status = ?,
      featured = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      brand,
      model,
      year,
      price,
      mileage,
      transmission,
      fuelType,
      color,
      description,
      JSON.stringify(images),
      status,
      featured || false,
      carId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating car:", err);

        return res.status(500).json({
          message: "Failed to update car",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Car not found",
        });
      }

      res.json({
        message: "Car updated successfully",
      });
    },
  );
});

app.delete("/api/cars/:id", (req, res) => {
  const carId = req.params.id;

  const sql = "DELETE FROM cars WHERE id = ?";

  db.query(sql, [carId], (err, result) => {
    if (err) {
      console.error("Error deleting car:", err);

      return res.status(500).json({
        message: "Failed to delete car",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.json({
      message: "Car deleted successfully",
    });
  });
});

app.patch("/api/cars/:id/status", (req, res) => {
  const carId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      message: "Status is required",
    });
  }

  const sql = "UPDATE cars SET status = ? WHERE id = ?";

  db.query(sql, [status, carId], (err, result) => {
    if (err) {
      console.error("Error updating car status:", err);

      return res.status(500).json({
        message: "Failed to update car status",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.json({
      message: "Car status updated successfully",
    });
  });
});

module.exports = app;
