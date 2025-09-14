# 📚 BookSwap Marketplace

A modern, responsive web application for exchanging used books within a community. Built with vanilla HTML, CSS, and JavaScript featuring JWT authentication, real-time search, and a beautiful glassmorphism UI.

![BookSwap Marketplace](https://img.shields.io/badge/Status-Complete-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

## ✨ Features

### 🔐 User Authentication
- **JWT-based authentication** with secure token management
- **User registration and login** with form validation
- **Session persistence** and automatic logout
- **User profile management** with bio and personal information

### 📖 Book Management
- **Add books** with detailed information (title, author, genre, condition, description)
- **Book categorization** by genre (Fiction, Mystery, Romance, etc.)
- **Condition tracking** (Excellent, Good, Fair, Poor)
- **Image placeholders** with Font Awesome icons
- **Date tracking** for when books were added

### 🔍 Advanced Search & Filtering
- **Real-time search** by title and author
- **Filter by condition** with dropdown selection
- **Sort functionality** (Title A-Z, Author A-Z, Condition, Newest First)
- **Clear filters** option for easy reset
- **No results messaging** with helpful suggestions

### 🤝 Request Management System
- **Send book requests** to other users
- **Three-status system**: Pending, Accepted, Declined
- **Manage incoming requests** (accept/decline functionality)
- **Track sent requests** with status updates
- **Prevent duplicate requests** for the same book

### 📊 User Dashboard & Analytics
- **Personal statistics** dashboard showing:
  - Total books listed
  - Active requests count
  - Completed exchanges
  - User rating
- **Exchange history** tracking all past transactions
- **Profile statistics** with visual cards
- **Member since** date tracking

### 🎨 Modern UI/UX
- **Glassmorphism design** with backdrop blur effects
- **Responsive grid layout** that adapts to screen sizes
- **Interactive hover effects** and smooth transitions
- **Tab-based navigation** for organized content
- **Modal dialogs** for detailed book views
- **Toast notifications** for user feedback
- **Mobile-first responsive design**

## 🚀 Quick Start

### Demo Credentials
```
Email: demo@example.com
Password: demo123
```

### Installation

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **No build process required** - runs directly in the browser

### Project Structure
```
bookswap-marketplace/
│
├── index.html          # Main HTML file with embedded CSS and JS
├── README.md          # This file
└── assets/           # (Optional) Future assets directory
    ├── images/       # Book cover images
    └── icons/        # Custom icons
```

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox/Grid, backdrop filters, animations
- **JavaScript (ES6+)** - Application logic, DOM manipulation, state management
- **Font Awesome 6.0** - Icons and visual elements

### Key Features Implementation

#### Mock JWT Authentication
```javascript
class MockJWT {
    static encode(payload) {
        return btoa(JSON.stringify(payload));
    }
    
    static decode(token) {
        try {
            return JSON.parse(atob(token));
        } catch {
            return null;
        }
    }
}
```

#### Real-time Search & Filter
```javascript
function filterAndSortBooks() {
    const searchTerm = document.getElementById('searchBooks').value.toLowerCase();
    const conditionFilter = document.getElementById('conditionFilter').value;
    const sortBy = document.getElementById('sortBooks').value;
    
    let filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                            book.author.toLowerCase().includes(searchTerm);
        const matchesCondition = !conditionFilter || book.condition === conditionFilter;
        return matchesSearch && matchesCondition;
    });
    
    // Sort and display logic...
}
```

#### State Management
- **In-memory data storage** during session
- **No external dependencies** - pure vanilla JavaScript
- **Reactive UI updates** based on state changes

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

### Mobile Features
- **Touch-friendly** button sizing
- **Collapsible navigation** 
- **Optimized layouts** for small screens
- **Swipe-friendly** modal dialogs

## 🎯 User Journey

### New User Flow
1. **Welcome Screen** with feature overview
2. **Sign Up** with email and password
3. **Dashboard** with tutorial hints
4. **Add First Book** guided experience
5. **Browse Books** and make first request

### Returning User Flow
1. **Login** with existing credentials
2. **Dashboard** with personalized stats
3. **Manage Requests** and respond to others
4. **Browse New Books** with saved preferences
5. **Update Profile** and view exchange history

## 📊 Data Models

### User Model
```javascript
{
    id: number,
    name: string,
    email: string,
    password: string,    // In production: hashed
    bio: string,
    joinDate: string,
    rating: number
}
```

### Book Model
```javascript
{
    id: number,
    title: string,
    author: string,
    genre: string,
    condition: 'excellent' | 'good' | 'fair' | 'poor',
    description: string,
    ownerId: number,
    ownerName: string,
    dateAdded: string
}
```

### Request Model
```javascript
{
    id: number,
    bookId: number,
    bookTitle: string,
    requesterId: number,
    requesterName: string,
    ownerId: number,
    ownerName: string,
    status: 'pending' | 'accepted' | 'declined',
    createdAt: string
}
```

## 🔧 Customization

### Styling
- **CSS Custom Properties** for easy theme changes
- **Modular CSS classes** for component styling
- **Responsive breakpoints** easily adjustable

### Adding Features
- **Modular JavaScript** structure for easy extension
- **Event-driven architecture** for new functionality
- **Clear separation** between UI and business logic

### Configuration Options
```javascript
// Easy customization points
const CONFIG = {
    ITEMS_PER_PAGE: 12,
    NOTIFICATION_DURATION: 3000,
    DEFAULT_SORT: 'title',
    SUPPORTED_GENRES: ['fiction', 'non-fiction', 'mystery', ...],
    CONDITION_LEVELS: ['excellent', 'good', 'fair', 'poor']
};
```

## 🚀 Deployment

### Static Hosting
Deploy easily to any static hosting service:

- **GitHub Pages** - Push to repository and enable Pages
- **Netlify** - Drag and drop the HTML file
- **Vercel** - Connect GitHub repository
- **AWS S3** - Upload to S3 bucket with static website hosting

### Local Development
```bash
# Option 1: Python (Python 3)
python -m http.server 8000

# Option 2: Node.js (if you have it installed)
npx http-server

# Option 3: PHP (if available)
php -S localhost:8000

# Then visit: http://localhost:8000
```

## 🛡️ Security Considerations

### Current Implementation (Demo)
- **Client-side only** - suitable for prototypes and demos
- **Mock authentication** - not secure for production
- **In-memory storage** - data doesn't persist

### Production Recommendations
- **Server-side authentication** with secure JWT implementation
- **Database integration** (PostgreSQL, MongoDB, etc.)
- **Input validation and sanitization**
- **HTTPS enforcement**
- **Rate limiting** for API endpoints
- **Password hashing** with bcrypt or similar

## 🔄 Future Enhancements

### Phase 2 Features
- [ ] **Real-time chat** between users
- [ ] **Book condition photos** upload
- [ ] **Location-based** filtering
- [ ] **Rating and review** system
- [ ] **Wishlist** functionality
- [ ] **Email notifications**

### Phase 3 Features
- [ ] **Mobile app** (React Native/Flutter)
- [ ] **Book scanning** with barcode/ISBN lookup
- [ ] **Social features** (follow users, recommendations)
- [ ] **Advanced analytics** dashboard
- [ ] **Multi-language** support
- [ ] **Dark mode** toggle

### Technical Improvements
- [ ] **Progressive Web App** (PWA) capabilities
- [ ] **Offline functionality** with Service Workers
- [ ] **State management** with Redux or similar
- [ ] **TypeScript** conversion for better type safety
- [ ] **Unit testing** with Jest
- [ ] **E2E testing** with Playwright

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style
- **2 spaces** for indentation
- **Semantic HTML** structure
- **BEM methodology** for CSS classes
- **ES6+** JavaScript features
- **Descriptive** variable and function names

### Bug Reports
Please include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- **Font Awesome** for beautiful icons
- **Google Fonts** for typography
- **CSS-Tricks** for modern CSS techniques
- **MDN Web Docs** for excellent documentation
- **The open source community** for inspiration

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Email**: your.email@example.com

---

**Happy Book Swapping! 📚✨**

> *"A room without books is like a body without a soul."* - Cicero
