# Changelog

All notable changes to CalcHub will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Complete README.md with comprehensive project documentation
- CONTRIBUTING.md with contribution guidelines
- CODE_OF_CONDUCT.md for community standards
- SECURITY.md for security policies
- LICENSE (MIT) for open source usage
- GitHub issue templates for bug reports and feature requests
- GitHub pull request template
- GitHub Actions CI workflow for basic validation
- Enhanced .gitignore for better git hygiene

### Changed
- Migrating all calculators to use INR (₹) as default currency
- Converting all calculators to metric units (kg, m, cm, km, °C)
- Refactoring calculators to separate HTML and JavaScript files

## [1.0.0] - 2025-11-27

### Added - Initial Release

#### Calculator Categories (12 total, 40+ calculators)

**🧮 Basic Calculators (4)**
- Standard Calculator with keyboard support
- Scientific Calculator with trigonometry and logarithms
- Unit Converter (length, weight, temperature, volume, area, speed)
- Currency Converter for major world currencies

**💰 Finance Calculators (5)**
- Loan Calculator with amortization
- Mortgage Calculator with taxes and insurance
- Compound Interest Calculator
- Salary Calculator (hourly/monthly/annual)
- Tip Calculator

**💚 Health Calculators (5)**
- BMI Calculator with metric/imperial support
- BMR & TDEE Calculator with activity levels
- Body Fat Calculator (multiple methods)
- Water Intake Calculator with climate adjustment
- Pregnancy Calculator with due date and milestones

**🏃 Sports Calculators (4)**
- Pace Calculator for running
- Calories Burned Calculator
- Heart Rate Zones Calculator
- 1RM Calculator with training percentages

**📊 Statistics Calculators (3)**
- Statistics Calculator (mean, median, mode, std dev)
- Percentage Calculator
- Probability Calculator with combinations/permutations

**🔢 Math Calculators (4)**
- Area Calculator for various shapes
- Fraction Calculator (add, subtract, multiply, divide)
- Quadratic Equation Solver (real and complex roots)
- Prime Number Checker with factors

**🎓 Education Calculators (2)**
- GPA Calculator with dynamic course management
- Grade Calculator with weighted assignments

**🔨 Construction Calculators (3)**
- Paint Calculator with door/window deductions
- Flooring Calculator with waste factor
- Concrete Calculator with bag requirements

**🔬 Science Calculators (2)**
- Physics Calculator (velocity, acceleration, force, energy)
- Density Calculator with unit conversions

**🌐 Internet Speed Calculators (4)**
- Download Time Calculator
- Bandwidth Calculator for multiple users
- Speed Converter (Mbps, MB/s, Gbps)
- Streaming Quality Checker

**⏰ Time Calculators (4)**
- Time Zone Converter with major cities
- Duration Calculator between dates
- Age Calculator with fun facts
- Date Calculator (add/subtract time)

**🍽️ Food Calculators (3)**
- Recipe Scaler for ingredient adjustment
- Cooking Unit Converter
- Macro Calculator for diet planning

**🏠 Everyday Calculators (4)**
- Fuel Cost Calculator
- Discount Calculator with tax
- Random Number Generator
- Password Generator with customization

### Features
- 📱 Fully responsive design for all devices
- 🎨 Modern, clean UI with consistent design language
- ⚡ Zero dependencies (pure vanilla JavaScript)
- 🔒 Privacy-first (all calculations client-side)
- 🌐 Works offline after initial load
- ⌨️ Keyboard support for applicable calculators
- 🎯 Input validation and error handling
- 📊 Visual result breakdowns where applicable
- 🔄 Reset functionality on all calculators
- 📄 Print-friendly layouts

### Technical
- HTML5 semantic markup
- CSS3 with modern features (Grid, Flexbox, Variables)
- ES6+ JavaScript (no transpilation needed)
- Font Awesome 6.4.0 for icons
- Organized file structure by category
- Deployment-ready (Netlify, Vercel, GitHub Pages)
- Python HTTP server for local development

---

## Version History

### Version Numbering

We use [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible changes
- **MINOR** version for new features (backward compatible)
- **PATCH** version for bug fixes (backward compatible)

### Release Types

- 🎉 **Major Release** - Significant new features or breaking changes
- ✨ **Minor Release** - New calculators or features
- 🐛 **Patch Release** - Bug fixes and minor improvements
- 🔒 **Security Release** - Security vulnerability fixes

---

## Future Releases

### Planned for v1.1.0
- [ ] Complete migration to INR and metric units
- [ ] Full JS/HTML separation for all calculators
- [ ] Utility functions library
- [ ] Enhanced test coverage
- [ ] Performance optimizations

### Planned for v1.2.0
- [ ] Dark mode toggle
- [ ] Calculation history
- [ ] Export results (PDF, image)
- [ ] Share results functionality
- [ ] More calculators (targeting 60+)

### Planned for v2.0.0
- [ ] Progressive Web App (PWA)
- [ ] Offline mode with service worker
- [ ] Multi-language support (i18n)
- [ ] User preferences storage
- [ ] Advanced calculator features

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute to CalcHub.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

---

[Unreleased]: https://github.com/Manish-024/CalcHub/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Manish-024/CalcHub/releases/tag/v1.0.0
