# BookSwap Marketplace

A modern web application built with the **MERN** stack that lets users exchange books with people in their community. Share favorites, discover new reads, and connect with fellow book lovers through seamless book exchanges.

<!-- ![App Screenshot](path/to/screenshot.png) -->

---

## ✨ Features

- **🔐 User Authentication**
  - Secure registration & login with JWT
  - Protected routes for authenticated users
  - User profile with optional location

- **📖 Book Management**
  - Add books (title, author, condition, description, image)
  - Browse available books (card layout)
  - My Books dashboard to manage personal collection
  - Book condition tracking: `New`, `Like New`, `Very Good`, `Good`, `Fair`
  - Image upload support (Cloudinary / local uploads)

- **🤝 Request System**
  - Send book requests with optional message
  - Request management with status tracking (`pending`, `accepted`, `declined`)
  - Views for received and sent requests
  - Status updates and notifications

- **🎨 Modern UI/UX**
  - Responsive UI (Tailwind CSS)
  - Smooth animations, loading states and error handling
  - Intuitive navigation with protected-route handling

---

## 🛠️ Tech Stack

**Backend**
- Node.js, Express.js
- MongoDB, Mongoose
- JWT (authentication)
- bcrypt (password hashing)
- Multer (file uploads)
- express-validator (input validation)

**Frontend**
- React 18
- React Router DOM
- Axios
- Tailwind CSS
- Context API (state management)

---

## 📁 Project Structure

bookswap-marketplace/
├── server/
│   ├── DbConfig/
│   │   └── bb.js                 # Database connection
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   │   └── multer.js 
    ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Book.js               # Book schema
│   │   └── Request.js            # Request schema
│   ├── routes/
│   │   ├── user.js               # Authentication routes
│   │   ├── books.js              # Book management routes
│   │   └── requests.js           # Request handling routes
│   ├── utils/
│   │   └── cloudinary.js/ 
    │── public/
│   │   └── uploads/                # Uploaded book images (if using local storage)
│   ├── .env                      # Environment variables
│   ├── app.js                 # Express server entry
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── Books/
│   │   │   │   ├── AddBook.jsx
│   │   │   │   ├── BookCard.jsx
│   │   │   │   ├── BookList.jsx
│   │   │   │   └── MyBooks.jsx
│   │   │   ├── Requests/
│   │   │   │   ├── RequestsPage.jsx
│   │   │   │   └── UpdateStatus.jsx
│   │   │   └── Layout/
│   │   │       ├── Navbar.jsx
│   │   │       └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── tailwind.config.js
│   └── package.json
└── README.md

🚀 Installation & Setup
Prerequisites
Node.js (v14+)
MongoDB (local or Atlas)
Git
Clone the repository

git clone https://github.com/yourusername/bookswap-marketplace.git
cd bookswap-marketplace

Backend setup
cd backend
npm install
cp .env.example .env

Example .env (edit values as needed):
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookswap
JWT_SECRET=your_super_secret_jwt_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

