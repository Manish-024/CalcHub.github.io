# 🧮 CalcHub

**A comprehensive collection of 40+ web-based calculators across 12 categories** - Your one-stop solution for everyday calculations!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

CalcHub is inspired by OmniCalculator and built with pure HTML5, CSS3, and vanilla JavaScript. No frameworks, no dependencies, no build process - just open and calculate!

## ✨ Features

- 🎯 **40+ Calculators** across 12 different categories
- 📱 **Fully Responsive** - works on desktop, tablet, and mobile
- 🚀 **Zero Dependencies** - pure vanilla JavaScript
- 🎨 **Modern UI** - clean, intuitive interface with Font Awesome icons
- 🌐 **Metric & INR by Default** - optimized for Indian users
- ⚡ **Instant Results** - no page reloads, smooth animations
- 🔒 **Privacy First** - all calculations happen in your browser
- 🌍 **Easy to Deploy** - works on any static hosting

## 📚 Calculator Categories

### 🧮 Basic (4 calculators)
- Standard Calculator - Arithmetic with keyboard support
- Scientific Calculator - Trigonometry, logarithms, constants
- Unit Converter - Length, weight, temperature, volume, area, speed
- Currency Converter - Major world currencies

### 💰 Finance (5 calculators)
- Loan Calculator
- Mortgage Calculator
- Compound Interest Calculator
- Salary Calculator
- Tip Calculator

### 💚 Health (5 calculators)
- BMI Calculator
- BMR & TDEE Calculator
- Body Fat Calculator
- Water Intake Calculator
- Pregnancy Calculator

### 🏃 Sports (4 calculators)
- Pace Calculator
- Calories Burned Calculator
- Heart Rate Zones
- 1RM (One Rep Max) Calculator

### 📊 Statistics (3 calculators)
- Statistics Calculator - Mean, median, mode, standard deviation
- Percentage Calculator
- Probability Calculator

### 🔢 Math (4 calculators)
- Area Calculator
- Fraction Calculator
- Quadratic Equation Solver
- Prime Number Checker

### 🎓 Education (2 calculators)
- GPA Calculator
- Grade Calculator

### 🔨 Construction (3 calculators)
- Paint Calculator
- Flooring Calculator
- Concrete Calculator

### 🔬 Science (2 calculators)
- Physics Calculator
- Density Calculator

### 🌐 Internet Speed (4 calculators)
- Download Time Calculator
- Bandwidth Calculator
- Speed Converter
- Streaming Quality Calculator

### ⏰ Time (4 calculators)
- Time Zone Converter
- Duration Calculator
- Age Calculator
- Date Calculator

### 🍽️ Food (3 calculators)
- Recipe Scaler
- Cooking Unit Converter
- Macro Calculator

### 🏠 Everyday (4 calculators)
- Fuel Cost Calculator
- Discount Calculator
- Random Number Generator
- Password Generator

## � Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!
- No server-side dependencies

### Running Locally

**Option 1: Direct File Opening**
```bash
# Clone the repository
git clone https://github.com/Manish-024/CalcHub.git
cd CalcHub

# Open index.html in your browser
open index.html  # macOS
# or double-click index.html in file explorer
```

**Option 2: Local Server (Recommended)**

Using Python:
```bash
cd CalcHub
python3 -m http.server 8000
# Visit: http://localhost:8000
```

Using Node.js:
```bash
npx http-server -p 8000
# Visit: http://localhost:8000
```

Using PHP:
```bash
php -S localhost:8000
```

## 🌐 Deployment Options

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Deploy! (No build command needed)

**Or use Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy
```

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy!

**Or use Vercel CLI:**
```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select branch (main) and folder (root)
4. Save and wait for deployment

### Deploy to Any Static Host

This project is pure HTML/CSS/JavaScript, so you can deploy to:
- AWS S3 + CloudFront
- Firebase Hosting
- Cloudflare Pages
- Any static web hosting service

## 📁 Project Structure

```
CalcHub/
├── index.html                    # Main homepage with all calculators
├── css/
│   ├── style.css                # Global styles and variables
│   └── calculator.css           # Calculator-specific styles
├── js/
│   └── utils.js                 # Shared utility functions
├── calculators/
│   ├── basic/                   # 4 calculators
│   ├── finance/                 # 5 calculators
│   ├── health/                  # 5 calculators
│   ├── sports/                  # 4 calculators
│   ├── statistics/              # 3 calculators
│   ├── math/                    # 4 calculators
│   ├── education/               # 2 calculators
│   ├── construction/            # 3 calculators
│   ├── science/                 # 2 calculators
│   ├── internet-speed/          # 4 calculators
│   ├── time/                    # 4 calculators
│   ├── food/                    # 3 calculators
│   └── everyday/                # 4 calculators
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── .gitignore
├── netlify.toml                 # Netlify configuration
└── vercel.json                  # Vercel configuration
```

Each calculator consists of:
- `calculator-name.html` - Calculator UI and structure
- `calculator-name.js` - Calculator logic (separate or embedded)

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --background: #f8fafc;
    /* ... */
}
```

### Adding New Calculators
1. Create HTML file in appropriate category folder
2. Create corresponding JavaScript file
3. Add calculator card to `index.html`
4. Follow existing calculator structure for consistency

## �️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Variables, Flexbox, Grid
- **Vanilla JavaScript (ES6+)** - No frameworks, no dependencies
- **Font Awesome 6.4.0** - Icon library (CDN)
- **No Build Process** - Direct file serving

## 🎨 Customization

### Changing Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --background: #f8fafc;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
}
```

### Adding a New Calculator
1. Create HTML file in the appropriate category folder
2. Create corresponding JavaScript file (or embed in HTML)
3. Add calculator card to `index.html`
4. Follow the existing calculator structure for consistency
5. Use shared utility functions from `js/utils.js`

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | Latest  |
| Firefox | Latest  |
| Safari  | Latest  |
| Edge    | Latest  |
| Opera   | Latest  |

✅ Fully responsive - works on desktop, tablet, and mobile devices

## 🤝 Contributing

Contributions are welcome! Whether it's:
- 🐛 Bug fixes
- ✨ New calculators
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- 🌐 Translations

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [OmniCalculator](https://www.omnicalculator.com/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Built with ❤️ for the open source community

## 📈 Roadmap

- [ ] Add more calculators (targeting 60+)
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] PWA (Progressive Web App) support
- [ ] Export/share calculation results
- [ ] Calculation history

## 📧 Support

- 🐛 **Bug Reports**: [Open an issue](https://github.com/Manish-024/CalcHub/issues)
- 💡 **Feature Requests**: [Open an issue](https://github.com/Manish-024/CalcHub/issues)
- 📧 **Email**: luciferpoint.0@protonmail.com

## ⭐ Show Your Support

If you find CalcHub useful, please consider:
- ⭐ Starring the repository
- 🍴 Forking and contributing
- 📢 Sharing with others

---

**Made with ❤️ by the CalcHub Team** | [Website](https://manish-024.github.io/CalcHub.github.io/) | [Documentation](https://github.com/Manish-024/CalcHub/wiki)
