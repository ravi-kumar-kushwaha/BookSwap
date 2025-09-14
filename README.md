BookSwap Marketplace
A modern web application built with the MERN stack that allows users to exchange books with other readers in their community. Share your favorite reads, discover new stories, and connect with fellow book lovers through seamless book exchanges.
Show Image
✨ Features
🔐 User Authentication
Secure Registration & Login with JWT tokens
Protected Routes for authenticated users only
User Profile Management with location tracking
📖 Book Management
Add Books with title, author, condition, description, and image upload
Browse Available Books in an attractive card-based layout
My Books Dashboard to manage your personal collection
Book Condition Tracking (New, Like New, Very Good, Good, Fair)
Image Upload for authentic book photos
🤝 Request System
Send Book Requests with optional messages to book owners
Request Management with status tracking (Pending, Accepted, Declined)
Dual Request Views - manage both received and sent requests
Status Updates with real-time notifications
🎨 Modern UI/UX
Responsive Design that works on all devices
Tailwind CSS for beautiful, consistent styling
Smooth Animations and interactive hover effects
Loading States and error handling
Intuitive Navigation with protected route management
🛠️ Tech Stack
Backend
Node.js - Runtime environment
Express.js - Web framework
MongoDB - Database
Mongoose - MongoDB object modeling
JWT - Authentication tokens
bcrypt - Password hashing
Multer - File upload handling
express-validator - Input validation
Frontend
React 18 - UI library
React Router DOM - Client-side routing
Axios - HTTP client
Tailwind CSS - Utility-first CSS framework
Context API - State management
📁 Project Structure


bookswap-marketplace/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Book.js              # Book schema
│   │   └── Request.js           # Request schema
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── books.js             # Book management routes
│   │   └── requests.js          # Request handling routes
│   ├── uploads/
│   │   └── books/               # Uploaded book images
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server setup
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
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
│   │   │   └── AuthContext.jsx  # Authentication context
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css            # Tailwind imports
│   ├── tailwind.config.js
│   └── package.json
└── README.md
🚀 Installation & Setup
Prerequisites
Node.js (v14 or higher)
MongoDB (local or MongoDB Atlas)
Git
Backend Setup
Clone the repository:


bash
git clone https://github.com/yourusername/bookswap-marketplace.git
cd bookswap-marketplace
Navigate to backend directory:


bash
cd backend
Install dependencies:


bash
npm install
Create environment file:


bash
cp .env.example .env
Configure environment variables in .env:


env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookswap
JWT_SECRET=your_super_secret_jwt_key_here
Create uploads directory:


bash
mkdir -p uploads/books
Start the server:


bash
# Development mode
npm run dev

# Production mode
npm start
Frontend Setup
Navigate to frontend directory:


bash
cd ../frontend
Install dependencies:


bash
npm install
Create environment file:


bash
cp .env.example .env
Configure environment variables in .env:


env
VITE_API_URL=http://localhost:5000
Start the development server:


bash
npm run dev
Build for production:


bash
npm run build
📱 Usage
Access the application at http://localhost:3000
Register a new account or login with existing credentials
Add your books by clicking "Add Book" and filling out the form
Browse available books on the "All Books" page
Request books by clicking on any book card and sending a request
Manage requests in the "Requests" section where you can accept/decline incoming requests
Track your books in "My Books" to see your personal collection
🔑 API Endpoints
Authentication
POST /api/auth/register - Register new user
POST /api/auth/login - User login
GET /api/auth/profile - Get user profile (protected)
Books
GET /api/books - Get all available books
GET /api/books/my-books - Get user's books (protected)
POST /api/books - Add new book (protected, with image upload)
PUT /api/books/:id - Update book (protected)
DELETE /api/books/:id - Delete book (protected)
Requests
POST /api/requests - Create book request (protected)
GET /api/requests/received - Get received requests (protected)
GET /api/requests/sent - Get sent requests (protected)
PUT /api/requests/:id - Update request status (protected)
🗄️ Database Schema
User Collection


javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  location: String,
  createdAt: Date,
  updatedAt: Date
}
Book Collection


javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  condition: String (enum),
  description: String,
  image: String,
  owner: ObjectId (ref: User),
  available: Boolean,
  createdAt: Date,
  updatedAt: Date
}
Request Collection


javascript
{
  _id: ObjectId,
  book: ObjectId (ref: Book),
  requester: ObjectId (ref: User),
  owner: ObjectId (ref: User),
  status: String (enum: pending, accepted, declined),
  message: String,
  createdAt: Date,
  updatedAt: Date
}
🔒 Security Features
JWT Authentication for secure user sessions
Password Hashing using bcrypt
Input Validation on all endpoints
File Upload Security with type and size restrictions
Protected Routes preventing unauthorized access
CORS Configuration for cross-origin requests
🎨 UI Components
Responsive Navigation with user authentication state
Interactive Book Cards with hover effects and animations
Modal Components for book requests
Form Validation with error handling
Loading States for better user experience
Success/Error Notifications for user feedback
🚧 Future Enhancements
Features to Add
Search & Filter functionality for books
User Ratings & Reviews system
Messaging System between users
Wishlist functionality
Book Categories/Genres filtering
Advanced User Profiles with reading preferences
Email Notifications for requests and updates
Mobile App development
Social Features (following users, book clubs)
Location-based book discovery
Technical Improvements
Image Optimization and compression
Caching implementation (Redis)
API Rate Limiting
Unit & Integration Tests
Docker containerization
CI/CD Pipeline setup
Performance Monitoring
SEO Optimization
🤝 Contributing
We welcome contributions to BookSwap Marketplace! Here's how you can help:
Fork the repository
Create a feature branch: git checkout -b feature/amazing-feature
Commit your changes: git commit -m 'Add amazing feature'
Push to the branch: git push origin feature/amazing-feature
Open a Pull Request
Contribution Guidelines
Follow the existing code style and structure
Write clear commit messages
Add documentation for new features
Test your changes thoroughly
Update README.md if needed
🐛 Bug Reports
Found a bug? Please create an issue with:
Clear description of the problem
Steps to reproduce
Expected vs actual behavior
Screenshots if applicable
Environment details (OS, browser, etc.)
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
👥 Authors
Your Name - Initial work - YourGitHub
🙏 Acknowledgments
Inspired by the love of reading and community sharing
Built with modern web technologies and best practices
Thanks to all contributors and testers
Special thanks to the open-source community
📞 Support
For support, email bookswap@example.com or create an issue in this repository.

Happy Book Swapping! 📚✨
Made with ❤️ by book lovers, for book lovers
