# 🛒 Scamazon

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge\&logo=mongodb)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge\&logo=redux\&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge\&logo=paypal\&logoColor=white)

Scamazon is a **full‑stack, production‑style e‑commerce platform** built using the **MERN Stack (MongoDB, Express, React, Node.js)**. The project focuses on building a **real-world scalable online store** with a premium UI/UX, secure authentication, modern state management, and integrated online payments.

This project replicates core features used by modern commerce platforms and demonstrates **full-stack engineering skills including authentication, state management, payment processing, admin dashboards, and product search systems.**

---

# 🌐 Live Demo

Frontend: **[Live Link Coming Soon]**

Backend API: **[Live Link Coming Soon]**

---

# ✨ Core Features

## 🛍️ Customer Features

### User Authentication

* Secure **JWT-based authentication**
* User registration and login
* Password encryption using **bcryptjs**
* Protected routes

### Product Browsing

* Product listing page
* Product detail page
* Image gallery
* Product ratings and reviews

### Product Search

* Keyword based product search
* Pagination support
* Optimized backend search queries

### Shopping Cart

* Add products to cart
* Remove items from cart
* Update item quantity
* Persistent cart state

### Checkout Flow

Step‑by‑step checkout system:

1. Shipping Address
2. Payment Method
3. Order Review
4. Place Order

### Payment Integration

* **PayPal Developer SDK** integration
* Real‑time payment processing
* Secure checkout system

### Order Management

Users can:

* View order history
* View individual order details
* Track payment status
* Track delivery status

### Product Reviews

* Verified purchase reviews
* Star rating system
* Review submission

---

# 🛠️ Admin Dashboard Features

### Admin Authentication

* Admin protected routes
* Role‑based authorization

### Product Management

Admins can:

* Create products
* Edit product details
* Upload product images
* Delete products

### Order Management

Admins can:

* View all orders
* Mark orders as delivered
* Monitor payment status

### User Management

Admins can:

* View registered users
* Delete users
* Manage user roles

---

# 🎨 UI / UX Highlights

Scamazon focuses on creating a **modern SaaS-like interface rather than traditional Bootstrap templates.**

### Design System

* **React-Bootstrap based UI system**
* Clean card layouts
* Responsive mobile-first design

### Visual Enhancements

* Dark / Light UI blending
* Soft shadows and layered cards
* Smooth hover animations

### Typography

* Inter font stack
* Clean spacing and readability

### UX Details

* Color coded order status badges
* Smooth navigation transitions
* Clean checkout experience

---

# ⚙️ Tech Stack

## Frontend

* React.js
* Redux Toolkit
* RTK Query
* React Router DOM
* React Bootstrap
* PayPal React SDK

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication & Security

* JSON Web Tokens (JWT)
* bcryptjs

---

# ⚙️ Environment Variables

Create a **.env file** in the root directory:

```
NODE_ENV=development
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone the Repository

```
git clone https://github.com/yourusername/scamazon.git
cd scamazon
```

## 2️⃣ Install Backend Dependencies

```
npm install
```

## 3️⃣ Install Frontend Dependencies

```
cd frontend
npm install
```

## 4️⃣ Run the Application

Run both frontend and backend concurrently:

```
npm run dev
```

Frontend will run on:

```
http://localhost:3000
```

Backend will run on:

```
http://localhost:8000
```

---

# 📂 Project Structure

```
scamazon

backend
 ├── controllers
 ├── models
 ├── routes
 ├── middleware
 └── server.js

frontend
 ├── components
 ├── screens
 ├── redux
 ├── slices
 └── App.js
```

---

# 📌 Planned Features

The following features are currently being developed:

* Advanced product filtering
* Product categories
* Image upload system
* Admin analytics dashboard
* Inventory management
* Email notifications
* Order tracking improvements

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit pull requests.

---

# 👤 Author

**S Rohan Kumar**

GitHub: [https://github.com/S-Rohan-Kumar](https://github.com/S-Rohan-Kumar)

---

# ⭐ Support

If you found this project useful, consider giving it a **star on GitHub ⭐**.
