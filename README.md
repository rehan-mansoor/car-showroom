# Car Showroom Website

A full-stack car showroom website built with **Next.js, React, Node.js, Express.js, and MySQL**. The website allows visitors to browse cars, search and filter vehicles, view detailed car information, and submit inquiries. A password-protected admin panel is provided for managing vehicles and customer inquiries.

## Live Demo

**Frontend Website:**
https://car-showroom-rho-dusky.vercel.app/

**Admin Panel:**
https://car-showroom-rho-dusky.vercel.app/admin

**Backend API:**
https://car-showroom-backend-eight.vercel.app/

## GitHub Repository

https://github.com/rehan-mansoor/car-showroom

## Features

### Home Page

- Showroom name and navigation
- Hero section
- Featured cars section
- Showroom information
- Footer with contact details
- Responsive layout for desktop and mobile

### Cars Listing Page

Visitors can:

- View all available cars
- Search by brand or model
- Filter cars by brand
- Filter cars by price range
- Open individual car details

Each car card displays:

- Main image
- Brand and model
- Model year
- Mileage
- Price
- View Details button

### Car Details Page

Each vehicle has a dedicated details page containing:

- Main vehicle image
- Multiple gallery images
- Brand
- Model
- Year
- Price
- Mileage
- Transmission
- Fuel type
- Color
- Description
- Availability status
- Customer inquiry form

### Customer Inquiry System

Visitors can submit an inquiry for a selected car using:

- Customer name
- Phone number
- Email
- Message

Submitted car inquiries are stored in the MySQL database and can be viewed and managed from the admin panel.

### Admin Panel

The admin panel is password protected.

The administrator can:

- View all cars
- Add new cars
- Edit car information
- Delete cars
- Change Available/Sold status
- Mark cars as Featured
- View customer inquiries
- View inquiry details
- Change inquiry status between New and Contacted

## Technology Stack

### Frontend

- Next.js 16
- React 19
- CSS

### Backend

- Node.js
- Express.js
- CORS
- MySQL2

### Database

- MySQL
- Aiven Cloud

### Deployment

- Vercel

## Project Structure

```text
car-showroom/
│
├── app/
│   ├── about/
│   ├── admin/
│   ├── cars/
│   │   └── [id]/
│   ├── contact/
│   └── ...
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── package.json
│   └── server.js
│
├── components/
├── public/
├── next.config.mjs
├── proxy.js
├── package.json
├── package-lock.json
├── eslint.config.mjs
├── jsconfig.json
├── .gitignore
└── README.md
```

## Database

The project uses MySQL with two main tables.

### Cars

```text
id
brand
model
year
price
mileage
transmission
fuelType
color
description
images
status
featured
```

### Inquiries

```text
id
car_id
name
phone
email
message
created_at
status
```

The deployed database currently contains **21 sample cars**, satisfying the requirement of at least 10 sample cars.

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/rehan-mansoor/car-showroom.git
cd car-showroom
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Configure backend environment variables

Create a `.env` file inside the `backend` folder.

```env
DB_HOST=your_mysql_host
DB_PORT=your_mysql_port
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_mysql_database
DB_SSL_CA=your_mysql_ssl_certificate

ADMIN_USER=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

Do not commit real credentials or certificates to GitHub.

### 5. Run the backend

Open a terminal inside the `backend` folder:

```bash
node server.js
```

The Express backend will start locally.

### 6. Run the frontend

From the project root:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Main Website Routes

```text
/                    Home page
/cars                Cars listing
/cars/[id]           Individual car details
/about               About page
/contact             Contact page
/admin               Password-protected admin panel
```

## Main API Endpoints

### Cars

```text
GET     /api/cars
GET     /api/cars/:id
POST    /api/cars
PUT     /api/cars/:id
DELETE  /api/cars/:id
PATCH   /api/cars/:id/status
```

### Inquiries

```text
POST    /api/inquiries
GET     /api/inquiries
PATCH   /api/inquiries/:id/status
```

## Environment Variables

Sensitive configuration is kept outside the GitHub repository.

### Database Variables

```text
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
DB_SSL_CA
```

### Admin Variables

```text
ADMIN_USER
ADMIN_PASSWORD
```

Real values are configured through deployment environment variables and are not included in this repository.

## Deployment Architecture

The application is deployed as two Vercel projects:

### Frontend

The Next.js frontend is deployed at:

https://car-showroom-rho-dusky.vercel.app/

### Backend

The Express backend is deployed at:

https://car-showroom-backend-eight.vercel.app/

### Database

The backend connects to the hosted MySQL database on Aiven.

The overall flow is:

```text
Visitor
   ↓
Next.js Frontend
   ↓
Express Backend API
   ↓
Aiven MySQL Database
```

## Responsive Design

The website is designed to work on:

- Desktop
- Laptop
- Tablet
- Mobile devices

The main visitor-facing pages and admin interface have been tested across desktop and mobile layouts.

## Project Requirements Covered

The project covers the requested core requirements:

- Clean and responsive showroom website
- Home page
- Navigation
- Hero section
- Featured cars
- Cars listing page
- Search by brand or model
- Brand filter
- Price range filter
- Car details page
- Multiple vehicle images
- Vehicle specifications
- Availability status
- Customer inquiry form
- Database storage for car inquiries
- Password-protected admin page
- Add, edit and delete cars
- Available/Sold management
- Customer inquiry management
- MySQL database integration
- At least 10 sample cars
- GitHub source code
- Online deployment

## Project Scope

The project intentionally focuses on the required showroom functionality.

The following features were not included because they were outside the project requirements:

- Online payments
- Financing calculators
- Booking systems
- Dealer integrations
- Multiple user roles
- AI features
- Advanced authentication systems

## Author

**Rehan**

Car Showroom Website
Full Stack Project
