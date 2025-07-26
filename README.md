# DevDishes 🍳

**Find your next favorite meal with DevDishes, a beautiful and intuitive recipe discovery web application.**

DevDishes is a modern, responsive web application that helps you discover exciting new recipes based on ingredients you have on hand or dish names you're craving. Built with a stunning glassmorphism design, animated gradients, and seamless user experience, finding your next culinary creation has never been more enjoyable.

<p align="center">
  <img src="images/food_logo.jpg" alt="DevDishes Logo" width="120" />
</p>

<p align="center">
  <img src="images/Screenshot-2025-07-26-115825.jpg" alt="DevDishes Screenshot" width="80%" />
</p>

## ✨ Key Features

### 🔍 Smart Search Capabilities
- **Flexible Recipe Search**: Search by ingredients you have (e.g., "chicken, rice, tomatoes") or specific dish names (e.g., "biryani", "pasta carbonara")
- **Advanced API Integration**: Powered by Spoonacular API with comprehensive recipe database
- **Intelligent Query Processing**: Handles both ingredient-based and recipe name searches seamlessly

### 🎨 Beautiful User Interface
- **Glassmorphism Design**: Modern glass-like effects with backdrop-filter blur
- **Animated Gradient Background**: Dynamic 12-second gradient animation with floating particles
- **Responsive Recipe Cards**: Grid layout with smooth hover effects and overlay interactions
- **Interactive Elements**: Touch-optimized buttons and form controls

### 📱 Responsive Design Excellence
- **Mobile-First Approach**: Optimized for phones, tablets, and desktops
- **Flexible Grid System**: Auto-fitting recipe cards (18rem to 24rem based on screen size)
- **Touch-Friendly**: Large click targets and gesture-optimized interactions
- **Cross-Browser Compatible**: Works seamlessly across all modern browsers

### 🍽️ Comprehensive Recipe Details
- **Detailed Recipe Modals**: Click any recipe to view complete information
- **Ingredient Lists**: Precise measurements and quantities
- **Step-by-Step Instructions**: Clear, formatted cooking directions
- **Recipe Metadata**: Cooking time, servings, cuisine type, and dietary information
- **Source Links**: Direct access to original recipe websites

### ⚡ Performance & Accessibility
- **Fast Loading**: Efficient API calls with comprehensive error handling
- **Accessibility Features**: WCAG compliant with semantic markup
- **Reduced Motion Support**: Respects user motion preferences
- **Dark Mode Ready**: System preference detection
- **Print Optimized**: Clean print styles for recipe cards

---

## 🛠️ Tech Stack

### Frontend Technologies
- **HTML5**: Semantic markup with proper accessibility structure
- **CSS3**: Modern styling with advanced features
  - **CSS Custom Properties**: Comprehensive design system with 40+ variables
  - **Flexbox & CSS Grid**: Robust responsive layouts
  - **CSS Animations**: 12-second gradient flow, particle animations, heartbeat effects
  - **Backdrop Filter**: Glassmorphism effects throughout the interface
  - **Media Queries**: 6 responsive breakpoints (mobile-first)
- **Vanilla JavaScript (ES6+)**:
  - Async/await for API integration
  - DOM manipulation and event handling
  - Modal system with keyboard support
  - Error handling with user feedback

### API & Data
- **Spoonacular API**: Recipe search and detailed information
- **RESTful Integration**: Complex search with multiple parameters
- **Data Processing**: Recipe formatting and image optimization

### Design System
- **Color Palette**: Primary (#667eea), Secondary (#764ba2), Accent (#6b73ff)
- **Typography**: Inter font family with 9 responsive text sizes
- **Spacing**: 8-point grid system with 7 spacing scales
- **Components**: Modular CSS with reusable classes

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- Internet connection for API calls
- Spoonacular API key (free tier available)

### Installation & Setup

1. **Clone the repository**

2. **Configure API Key**
   - Open `script.js`
   - The current API key is already configured:
- If you need your own API key, get it from [Spoonacular API](https://spoonacular.com/food-api)

3. **Launch the application**

**Option A: Direct Browser Access**

**Option B: Local Development Server (Recommended)**

**Option C: VS Code Live Server**
- Install Live Server extension
- Right-click `index.html` → "Open with Live Server"

---

## 📖 Usage Guide

### Basic Search
1. **Enter Search Terms**: Type ingredients (comma-separated) or dish names
- Examples: `"chicken, rice, curry"` or `"biryani"`
2. **Search Methods**: Click "Search Recipes" or press Enter
3. **Browse Results**: Scroll through the responsive recipe grid

### Recipe Interaction
1. **Hover Effects**: Desktop users see overlay buttons on hover
2. **View Recipe**: Click "View Recipe" button to open detailed modal
3. **Recipe Details**: Review ingredients, instructions, and metadata
4. **External Links**: Click "View Full Recipe" for original source

### Mobile Experience
- **Touch Optimized**: Large tap targets and gesture-friendly interface
- **Responsive Design**: Automatic layout adaptation
- **Performance**: Optimized for mobile networks and devices

---

## 📂 Project Architecture

DevDishes/
├── 📄 index.html # Main application structure
│ ├── Header with logo and title
│ ├── Search section with glassmorphism
│ ├── Results grid container
│ ├── Recipe modal system
│ └── Footer with branding
│
├── 🎨 style.css # Complete styling system (19KB)
│ ├── CSS Custom Properties (40+ variables)
│ ├── Reset and base styles
│ ├── Animated background system
│ ├── Responsive grid layouts
│ ├── Modal and overlay styles
│ ├── Media queries (6 breakpoints)
│ ├── Accessibility features
│ └── Print optimization
│
├── ⚙️ script.js # Application logic (10KB)
│ ├── API integration functions
│ ├── DOM manipulation utilities
│ ├── Event handling system
│ ├── Modal management
│ ├── Error handling
│ └── Loading states
│
├── 🖼️ images/
│ ├── food_logo.jpg # Main application logo
│ └── Screenshot-2025-07-26-115825.jpg # Application screenshot
│
└── 📖 README.md # Project documentation

---

## ⚙️ Configuration & Customization

### API Configuration
// script.js - Line 3
const apiKey = "804549490fb34a349c078c66a4e15f00"; // Your current API key

// API endpoint configuration
const searchUrl = https://api.spoonacular.com/recipes/complexSearch +
?query=${encodeURIComponent(ingredients)} +
&includeIngredients=${encodeURIComponent(ingredients)} +
&number=20&addRecipeInformation=true&fillIngredients=true&apiKey=${apiKey};


### Theme Customization
/* style.css - CSS Custom Properties /
:root {
--primary-color: #667eea; / Main brand color /
--secondary-color: #764ba2; / Secondary accent /
--accent-color: #6b73ff; / Interactive elements */

/* Modify these values to change the entire color scheme /
--border-radius: 0.75rem; / Global border radius /
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); / Smooth transitions */
}

### Responsive Breakpoints
- **Mobile**: `< 576px` (36em) - Single column layout
- **Small**: `576px+` (36em) - Enhanced mobile experience
- **Medium**: `768px+` (48em) - Tablet optimization
- **Large**: `992px+` (62em) - Desktop layout
- **Extra Large**: `1200px+` (75em) - Large desktop optimization

---

## 🔧 API Integration Details

### Spoonacular API Features Used
- **Complex Recipe Search**: Multi-parameter search functionality
- **Recipe Information**: Detailed nutrition and cooking data
- **Ingredient Matching**: Smart ingredient-based recommendations
- **Image Processing**: High-quality recipe images with fallbacks

### Error Handling System

### Testing Checklist
- [ ] Search functionality with various queries
- [ ] Responsive design across devices
- [ ] Modal interactions and keyboard navigation
- [ ] API error handling
- [ ] Performance on slower networks
- [ ] Accessibility with screen readers

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following our coding standards
4. Test across different browsers and devices
5. Commit with descriptive messages: `git commit -m 'Add amazing feature'`
6. Push to your branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Coding Standards
- **HTML**: Semantic markup with proper accessibility
- **CSS**: Mobile-first responsive design using custom properties
- **JavaScript**: ES6+ syntax with proper error handling
- **Performance**: Optimize for Core Web Vitals
- **Accessibility**: Follow WCAG 2.1 AA guidelines

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🙏 Acknowledgments

- **[Spoonacular API](https://spoonacular.com/food-api)**: Comprehensive recipe database
- **Inter Font**: Beautiful typography from Google Fonts
- **Modern CSS**: Utilizing cutting-edge web technologies
- **Open Source Community**: For inspiration and best practices

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/your-username/DevDishes/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/DevDishes/discussions)
- **Email**: deepanshutyagi@example.com

---

<div align="center">

**Made with ❤️ by Deepanshu Tyagi**

*Recipes served with developer precision*

[⭐ Star this repo](https://github.com/your-username/DevDishes) • [🐛 Report Bug](https://github.com/your-username/DevDishes/issues) • [💡 Request Feature](https://github.com/your-username/DevDishes/issues)

</div>
