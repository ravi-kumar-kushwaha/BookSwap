# 📚 BookSwap Marketplace

A full-stack web application for exchanging used books within a community. Built with the MERN stack, featuring real-time book management, secure authentication, and intuitive user experience.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-success)](https://bookswap-noaq.onrender.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)

## 🌐 Live Application

**🔗 [Visit BookSwap Marketplace](https://bookswap-noaq.onrender.com)**

> **Note**: The app is hosted on Render's free tier, so it may take 30-60 seconds to load initially due to cold start.

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token management
- **Protected routes** and middleware authorization
- **User registration** with email validation
- **Password hashing** with bcrypt

### 📖 Book Management
- **CRUD operations** for book listings
- **Image upload** with Cloudinary integration
- **Advanced search** and filtering capabilities
- **Book categorization** by genre and condition
- **Real-time availability** status

### 🤝 Exchange System
- **Request management** with status tracking
- **Notification system** for request updates
- **Exchange history** and analytics
- **User ratings** and reviews

### 📊 Dashboard & Analytics
- **Personal statistics** and metrics
- **Exchange history** tracking
- **User profile** management
- **Activity timeline**

### 📱 Responsive Design
- **Mobile-first** approach
- **Cross-browser** compatibility
- **Modern UI/UX** with React components
- **Loading states** and error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** - Component-based UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS Modules** - Scoped styling
- **React Hooks** - State and lifecycle management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Cloudinary** - Image storage and management
- **CORS** - Cross-origin resource sharing

### Deployment
- **Render** - Cloud hosting platform
- **MongoDB Atlas** - Cloud database service
- **Environment Variables** - Secure configuration management

## 📁 Project Structure

```
bookswap-marketplace/
│
├── client/                     # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Books/
│   │   │   │   ├── BookCard.jsx
│   │   │   │   ├── BookForm.jsx
│   │   │   │   └── BookList.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── Statistics.jsx
│   │   │   │   └── UserProfile.jsx
│   │   │   ├── Layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   └── Requests/
│   │   │       ├── RequestCard.jsx
│   │   │       └── RequestList.jsx
│   │   ├── pages/              # Main application pages
│   │   │   ├── Home.jsx
│   │   │   ├── Browse.jsx
│   │   │   ├── MyBooks.jsx
│   │   │   ├── Requests.jsx
│   │   │   └── Profile.jsx
│   │   ├── services/           # API service functions
│   │   │   ├── authService.js
│   │   │   ├── bookService.js
│   │   │   └── requestService.js
│   │   ├── context/            # React Context providers
│   │   │   └── AuthContext.jsx
│   │   ├── utils/              # Helper functions
│   │   │   ├── constants.js
│   │   │   └── validators.js
│   │   ├── styles/             # Global styles
│   │   │   └── index.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
│
├── server/                     # Node.js backend
│   ├── controllers/            # Route handlers
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── requestController.js
│   │   └── userController.js
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js
│   │   ├── upload.js
│   │   └── errorHandler.js
│   ├── models/                 # MongoDB schemas
│   │   ├── User.js
│   │   ├── Book.js
│   │   ├── Request.js
│   │   └── Exchange.js
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── books.js
│   │   ├── requests.js
│   │   └── users.js
│   ├── config/                 # Configuration files
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── utils/                  # Server utilities
│   │   ├── generateToken.js
│   │   └── sendEmail.js
│   ├── .env                    # Environment variables
│   ├── server.js               # Main server file
│   ├── package.json
│   └── package-lock.json
│
├── README.md
├── .gitignore
└── package.json                # Root package.json for deployment
```

## 🗄️ Database Schema (MongoDB)

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, required),
  password: String (hashed),
  bio: String,
  avatar: String (Cloudinary URL),
  rating: Number (default: 0),
  totalExchanges: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Books Collection
```javascript
{
  _id: ObjectId,
  title: String (required),
  author: String (required),
  genre: String,
  condition: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor']
  },
  description: String,
  image: String (Cloudinary URL),
  owner: ObjectId (ref: 'User'),
  isAvailable: Boolean (default: true),
  requestCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Requests Collection
```javascript
{
  _id: ObjectId,
  book: ObjectId (ref: 'Book'),
  requester: ObjectId (ref: 'User'),
  owner: ObjectId (ref: 'User'),
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  message: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Exchanges Collection
```javascript
{
  _id: ObjectId,
  request: ObjectId (ref: 'Request'),
  book: ObjectId (ref: 'Book'),
  lender: ObjectId (ref: 'User'),
  borrower: ObjectId (ref: 'User'),
  startDate: Date,
  expectedReturnDate: Date,
  actualReturnDate: Date,
  status: {
    type: String,
    enum: ['active', 'completed', 'overdue'],
    default: 'active'
  },
  lenderRating: Number (1-5),
  borrowerRating: Number (1-5),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/bookswap-marketplace.git
cd bookswap-marketplace
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Environment Variables**
Create `.env` file in the server directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookswap
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Start the application**
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm start
```

5. **Access the application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
GET    /api/auth/me           # Get current user
PUT    /api/auth/profile      # Update profile
```

### Books
```
GET    /api/books             # Get all books (with filters)
POST   /api/books             # Create new book
GET    /api/books/:id         # Get single book
PUT    /api/books/:id         # Update book
DELETE /api/books/:id         # Delete book
GET    /api/books/user/:id    # Get user's books
```

### Requests
```
GET    /api/requests          # Get user's requests
POST   /api/requests          # Create new request
PUT    /api/requests/:id      # Update request status
DELETE /api/requests/:id      # Cancel request
GET    /api/requests/received # Get received requests
```

### Users
```
GET    /api/users/:id         # Get user profile
PUT    /api/users/:id         # Update user profile
GET    /api/users/:id/stats   # Get user statistics
```

## 🔧 Configuration

### Environment Variables
```env
# Server Configuration
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookswap

# Authentication
JWT_SECRET=your_super_secure_jwt_secret
JWT_EXPIRE=30d

# Image Upload
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

## 🚀 Deployment

### Render Deployment
This project is configured for easy deployment on Render:

1. **Connect your GitHub repository** to Render
2. **Set environment variables** in Render dashboard
3. **Deploy** with the following settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: `18`

### Manual Deployment
```bash
# Build for production
cd client
npm run build

# Start server
cd ../server
npm start
```

## 🔮 Future Enhancements

### Phase 2
- [ ] **Real-time messaging** between users
- [ ] **Push notifications** for mobile browsers
- [ ] **Advanced search** with Elasticsearch
- [ ] **Book recommendations** using ML
- [ ] **Social features** (follow users, activity feed)

### Phase 3
- [ ] **Mobile app** (React Native)
- [ ] **Barcode scanning** for book ISBN
- [ ] **Integration** with Goodreads API
- [ ] **Multi-language** support
- [ ] **Payment integration** for shipping costs

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [your-portfolio.com](https://your-portfolio.com)
- Email: your.email@example.com

## 🙏 Acknowledgments

- **MongoDB Atlas** for cloud database hosting
- **Render** for free application hosting
- **Cloudinary** for image storage and optimization
- **React community** for excellent documentation
- **Express.js team** for the robust backend framework

---

<div align="center">

### 🌟 If you found this project helpful, please give it a star!

**Made with ❤️ and the MERN stack**

</div>
