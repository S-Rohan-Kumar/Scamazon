# 🛒 Scamazon

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

Scamazon is a full-stack, feature-rich e-commerce platform built with the MERN stack. It features a premium, modern user interface, secure authentication, and end-to-end payment integration using the PayPal SDK.

## ✨ Key Features

* **Premium UI/UX:** Custom dark/light mode component blending, soft shadows, and responsive design built on top of React-Bootstrap.
* **Shopping Cart:** Full cart functionality including adding/removing items and dynamic quantity adjustments.
* **Secure Checkout Flow:** Step-by-step progressive checkout (Shipping, Payment Method, Final Review).
* **Live Payment Integration:** Real-time, secure transaction processing using the PayPal Developer SDK.
* **Order Management:** Dedicated user profiles with comprehensive order history and status badges (Paid, Delivered).
* **State Management:** Powered by Redux Toolkit (RTK) and RTK Query for efficient API caching and state hydration.
* **Authentication:** Secure JWT-based user authentication and protected routing.

## 🛠️ Tech Stack

**Frontend:**
* React.js
* Redux Toolkit & RTK Query
* React-Bootstrap
* React Router DOM
* PayPal React SDK

**Backend:**
* Node.js
* Express.js
* MongoDB & Mongoose
* JSON Web Tokens (JWT) & bcryptjs for Authentication

## ⚙️ Environment Variables

To run this project, you will need to add a `.env` file to your root directory with the following variables:

```env
NODE_ENV=development
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id

🚀 Installation & Setup
1. Clone the repository

Bash
git clone [https://github.com/yourusername/scamazon.git](https://github.com/yourusername/scamazon.git)
cd scamazon
2. Install Backend Dependencies

Bash
npm install
3. Install Frontend Dependencies

Bash
cd frontend
npm install
4. Run the Application (Concurrently)
From the root directory, run both the frontend and backend simultaneously:

Bash
npm run dev
(The application will run with the frontend typically on http://localhost:3000 and the backend on http://localhost:8000)

🎨 UI / UX Highlights
Scamazon moves away from standard, rigid Bootstrap templates to deliver a SaaS-like experience. It utilizes:

Typography: Inter font stack with tight letter spacing for a sleek, modern feel.

Dark Mode Summaries: High-contrast #111 summary cards paired with clean #fff item lists.

Micro-interactions: Smooth hover scaling and custom, color-coded status badges for order states.

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the issues page.

👤 Author
S Rohan Kumar

GitHub: S-Rohan-Kumar

If you found this project helpful, please consider giving it a ⭐ on GitHub!
