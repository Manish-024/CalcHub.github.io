# Contributing to CalcHub

First off, thank you for considering contributing to CalcHub! 🎉

It's people like you that make CalcHub such a great tool. We welcome contributions from everyone, whether you're fixing a typo, adding a new calculator, or improving the documentation.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)
- [Adding a New Calculator](#adding-a-new-calculator)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Welcome newcomers and help them learn
- ✅ Focus on what is best for the community
- ✅ Show empathy towards other community members
- ❌ No harassment, trolling, or derogatory comments
- ❌ No spam or self-promotion without permission

## 🤝 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** (if applicable)
- **Browser and OS** information
- **Calculator name** where the bug occurs

**Template:**
```markdown
**Calculator:** [e.g., BMI Calculator]
**Browser:** [e.g., Chrome 120]
**OS:** [e.g., macOS 14.0]

**Steps to reproduce:**
1. Go to '...'
2. Enter '....'
3. Click on '....'
4. See error

**Expected behavior:**
[What you expected to happen]

**Actual behavior:**
[What actually happened]

**Screenshots:**
[If applicable]
```

### 💡 Suggesting Features

Feature suggestions are welcome! Please:

1. **Check existing issues** to see if it's already suggested
2. **Provide a clear use case** - why is this feature needed?
3. **Describe the feature** in detail
4. **Consider the scope** - does it fit CalcHub's purpose?

### 🔧 Code Contributions

1. **Bug fixes** - Always welcome!
2. **New calculators** - Follow our calculator template
3. **UI improvements** - Must maintain consistency
4. **Documentation** - Improve README, comments, or guides
5. **Performance** - Optimize existing code

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/CalcHub.git
cd CalcHub
```

### 2. Create a Branch

```bash
# Create a descriptive branch name
git checkout -b feature/add-retirement-calculator
# or
git checkout -b fix/bmi-calculation-error
```

### 3. Make Your Changes

Follow our [Development Guidelines](#development-guidelines) below.

### 4. Test Your Changes

```bash
# Run a local server
python3 -m http.server 8000

# Visit http://localhost:8000
# Test your changes thoroughly
```

### 5. Commit and Push

```bash
git add .
git commit -m "Add retirement calculator"
git push origin feature/add-retirement-calculator
```

### 6. Create a Pull Request

Go to GitHub and create a Pull Request from your branch.

## 🛠️ Development Guidelines

### File Structure

```
calculators/
└── [category]/
    ├── calculator-name.html    # UI and structure
    └── calculator-name.js      # Logic (separate or embedded)
```

### Calculator Categories

Place your calculator in the appropriate category:

- `basic/` - Core calculators (arithmetic, units, currency)
- `finance/` - Money-related calculators
- `health/` - Health and fitness calculators
- `sports/` - Athletic performance calculators
- `statistics/` - Statistical calculations
- `math/` - Mathematical calculators
- `education/` - Academic calculators
- `construction/` - Building and DIY calculators
- `science/` - Scientific calculators
- `internet-speed/` - Network and speed calculators
- `time/` - Time and date calculators
- `food/` - Cooking and nutrition calculators
- `everyday/` - Daily life calculators

Not sure? Ask in the issue or PR!

## ➕ Adding a New Calculator

### Step 1: Create the HTML File

Use this template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Calculator Name - CalcHub</title>
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/calculator.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="calculator-page">
    <header class="calculator-header">
        <div class="container">
            <a href="../../index.html" class="back-button">
                <i class="fas fa-arrow-left"></i> Back to Home
            </a>
            <div class="calculator-title">
                <i class="fas fa-icon-name"></i>
                <h1>Your Calculator Name</h1>
            </div>
        </div>
    </header>

    <main class="calculator-container">
        <div class="container">
            <div class="calculator-content">
                <div class="calculator-description">
                    <h2>About This Calculator</h2>
                    <p>Brief description of what this calculator does.</p>
                </div>

                <div class="calculator-form">
                    <form id="yourForm">
                        <div class="form-section">
                            <h3><i class="fas fa-icon"></i> Section Title</h3>
                            
                            <div class="form-group">
                                <label for="input1">
                                    Input Label <span class="required">*</span>
                                </label>
                                <input type="number" id="input1" required>
                            </div>
                        </div>

                        <div class="button-group">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-calculator"></i> Calculate
                            </button>
                            <button type="reset" class="btn btn-secondary">
                                <i class="fas fa-redo"></i> Reset
                            </button>
                        </div>
                    </form>
                </div>

                <div id="result" class="result-container">
                    <h3><i class="fas fa-icon"></i> Results</h3>
                    
                    <div class="result-item">
                        <div class="result-label">Result Label</div>
                        <div class="result-value" id="resultValue">--</div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 CalcHub. All rights reserved.</p>
        </div>
    </footer>

    <script src="../../js/utils.js"></script>
    <script src="your-calculator.js"></script>
</body>
</html>
```

### Step 2: Create the JavaScript File

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('yourForm');
    const resultContainer = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculate();
    });

    form.addEventListener('reset', function() {
        resultContainer.style.display = 'none';
    });

    function calculate() {
        // Get input values
        const input1 = parseFloat(document.getElementById('input1').value);
        
        // Perform calculations
        const result = input1 * 2; // Your logic here
        
        // Display results
        document.getElementById('resultValue').textContent = result.toFixed(2);
        
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
```

### Step 3: Add to index.html

Add your calculator card to the appropriate category section:

```html
<div class="calc-card">
    <div class="calc-icon">
        <i class="fas fa-your-icon"></i>
    </div>
    <h3>Your Calculator Name</h3>
    <p>Brief description</p>
    <a href="calculators/category/your-calculator.html" class="calc-link">
        Calculate <i class="fas fa-arrow-right"></i>
    </a>
</div>
```

### Step 4: Test Thoroughly

- ✅ Test all input combinations
- ✅ Test with invalid inputs
- ✅ Test on mobile devices
- ✅ Test in different browsers
- ✅ Verify calculations are correct
- ✅ Check responsive design

## 📏 Coding Standards

### HTML

- Use semantic HTML5 elements
- Include proper `meta` tags
- Add `required` attribute for mandatory fields
- Use `type="number"` with `step="any"` for decimal inputs
- Include helpful `placeholder` text

### CSS

- Use existing CSS classes from `style.css` and `calculator.css`
- Don't add inline styles
- Maintain consistent spacing and colors
- Use CSS variables for colors
- Ensure mobile responsiveness

### JavaScript

- Use ES6+ syntax
- Use `const` and `let`, not `var`
- Add input validation
- Handle edge cases (division by zero, negative numbers, etc.)
- Use meaningful variable names
- Add comments for complex logic
- Use `parseFloat()` for number inputs
- Use `.toFixed(2)` for decimal results

### Units and Currency

- **Default currency**: INR (₹)
- **Default units**: Metric (kg, m, cm, km, °C, liters)
- If supporting multiple units, default to metric
- Clearly label units in input fields

### Example Good Code:

```javascript
function calculateBMI(weightKg, heightCm) {
    // Convert height to meters
    const heightM = heightCm / 100;
    
    // Calculate BMI using metric formula
    const bmi = weightKg / (heightM * heightM);
    
    // Return rounded result
    return bmi.toFixed(1);
}
```

### Example Bad Code:

```javascript
function calc(w, h) {
    var x = w / ((h / 100) * (h / 100)); // What is x?
    return x;
}
```

## 📝 Commit Messages

Use clear, descriptive commit messages:

### Format:
```
<type>: <subject>

<body> (optional)
```

### Types:
- `feat:` New feature or calculator
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` CSS/formatting changes (not code logic)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

### Examples:
```bash
feat: add retirement calculator

fix: correct BMI calculation for edge cases

docs: update README with deployment instructions

style: improve mobile responsiveness for finance calculators

refactor: extract common currency formatting to utils.js
```

## 🔄 Pull Request Process

### Before Submitting

- [ ] Test your changes thoroughly
- [ ] Update documentation if needed
- [ ] Follow coding standards
- [ ] Ensure no console errors
- [ ] Check mobile responsiveness
- [ ] Verify calculations are accurate

### PR Description Template

```markdown
## Description
[Brief description of changes]

## Type of Change
- [ ] Bug fix
- [ ] New calculator
- [ ] Enhancement
- [ ] Documentation

## Calculator Details (if adding new calculator)
- **Name**: [Calculator name]
- **Category**: [Category]
- **Purpose**: [What it calculates]

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on mobile
- [ ] Calculations verified

## Screenshots
[If applicable]

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have tested my changes
- [ ] I have updated documentation
- [ ] My commits have clear messages
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Celebrate! 🎉 You're now a CalcHub contributor!

## 🎯 Good First Issues

New to the project? Look for issues labeled:
- `good first issue`
- `help wanted`
- `documentation`

## 💬 Questions?

- Open an issue with the `question` label
- Check existing issues and discussions
- Be patient and respectful

## 🏆 Recognition

All contributors will be:
- Listed in our contributors list
- Credited in release notes
- Part of the CalcHub community!

---

**Thank you for contributing to CalcHub!** 🙏

Your contributions help make calculations easier for everyone. We appreciate your time and effort!
