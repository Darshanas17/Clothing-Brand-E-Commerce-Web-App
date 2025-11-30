# Clothing E-Commerce Web Application

This is a MERN stack e-commerce web application for a clothing brand. The application supports features like user authentication, product browsing with filters, a shopping cart, order placement, and sending order confirmation emails.

---

## Live Demo

Frontend:https://clothing-brand-e-commerce-web-app.onrender.com/

Backend API:https://backend-clothing-brand-e-commerce-web-app.onrender.com

---

## GitHub Repository

[https://github.com/Darshanas17/Clothing-Brand-E-Commerce-Web-App.git](https://github.com/Darshanas17/Clothing-Brand-E-Commerce-Web-App.git)

---

## Tech Stack

- MongoDB
- Express.js
- React.js (Create React App)
- Node.js
- Axios
- JWT Authentication
- Nodemailer (Order Confirmation Email)

---

## Features

- User registration and login
- JWT-based authentication with HTTP-only cookies
- Browse products with filters and search
- Product detail page
- Update cart items and quantities
- Checkout page
- Order placement
- Email confirmation after order
- Responsive simple UI

---

## Project Structure

```
Clothing-Brand-E-Commerce-Web-App/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   ├── App.js
    │   └── index.js
    └── .env
```

---

## Backend Setup

```
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
FRONTEND_URL=http://localhost:3000
```

Start backend server:

```
npm run dev
```

---

## Frontend Setup

```
cd frontend
npm install
```

Create `.env`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:

```
npm start
```

---

## Seeding Products

```
cd backend
node seedProducts.js
```

This inserts 20+ products into the MongoDB database.

---

## Running the Application

Start both backend and frontend:

Backend:

```
npm run dev
```

Frontend:

```
npm start
```

Open in browser:

```
http://localhost:3000
```

---

## Notes

- Gmail requires App Passwords for Nodemailer
- Use the same repo folder with `backend` and `frontend` folders
