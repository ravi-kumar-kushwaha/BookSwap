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

