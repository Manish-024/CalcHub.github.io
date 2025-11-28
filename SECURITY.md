# Security Policy

## Supported Versions

We are currently maintaining the following versions of CalcHub:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < 1.0   | :x:                |

## Security Considerations

CalcHub is a client-side web application that runs entirely in the browser. However, we take security seriously:

### What We Do

- ✅ **No data collection**: All calculations happen locally in your browser
- ✅ **No server-side processing**: Pure client-side JavaScript
- ✅ **No external API calls**: Except Font Awesome CDN for icons
- ✅ **Input validation**: All user inputs are validated
- ✅ **XSS prevention**: We sanitize outputs and use safe DOM manipulation
- ✅ **No cookies or tracking**: Your privacy is protected

### What Users Should Know

- 🔒 **No sensitive data transmission**: All calculations stay in your browser
- 🔒 **HTTPS recommended**: Use HTTPS when deployed to prevent MITM attacks
- 🔒 **Regular updates**: Keep your browser updated for best security

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow these steps:

### 1. Do Not Open a Public Issue

Please **do not** report security vulnerabilities through public GitHub issues.

### 2. Report Privately

Instead, please report security issues via:

- **Email**: [INSERT SECURITY EMAIL]
- **Subject**: "CalcHub Security Vulnerability"

### 3. Include in Your Report

Please include as much information as possible:

- **Type of vulnerability**: XSS, injection, etc.
- **Calculator affected**: Which calculator or page
- **Steps to reproduce**: Detailed steps to trigger the vulnerability
- **Impact**: What could an attacker do?
- **Suggested fix**: If you have ideas (optional)
- **Your contact info**: For follow-up questions

### 4. Response Timeline

- **Within 24 hours**: We'll acknowledge receipt of your report
- **Within 7 days**: We'll provide a detailed response with next steps
- **Within 30 days**: We aim to release a fix (timeline depends on severity)

### 5. After Resolution

- We'll credit you in the security advisory (if you wish)
- We'll notify you when the fix is deployed
- We may ask you to verify the fix

## Security Best Practices for Contributors

If you're contributing to CalcHub, please:

### Input Validation

```javascript
// ✅ Good: Validate and sanitize inputs
const age = Math.max(0, Math.min(120, parseFloat(input.value)));

// ❌ Bad: Using raw input without validation
const age = parseFloat(input.value);
```

### DOM Manipulation

```javascript
// ✅ Good: Use textContent for text
element.textContent = userInput;

// ❌ Bad: Using innerHTML with user input
element.innerHTML = userInput; // XSS risk!
```

### Calculations

```javascript
// ✅ Good: Handle edge cases
if (denominator === 0) {
    throw new Error('Division by zero');
}

// ❌ Bad: No error handling
const result = numerator / denominator;
```

### External Resources

```javascript
// ✅ Good: Use SRI (Subresource Integrity) for CDN resources
<link rel="stylesheet" 
      href="https://cdn.example.com/style.css"
      integrity="sha384-..." 
      crossorigin="anonymous">

// ❌ Bad: No integrity check
<link rel="stylesheet" href="https://cdn.example.com/style.css">
```

## Common Vulnerabilities to Avoid

### 1. Cross-Site Scripting (XSS)

**Risk**: User input displayed without sanitization

**Prevention**:
- Always use `textContent` instead of `innerHTML` for user input
- Validate and sanitize all inputs
- Use CSP (Content Security Policy) headers

### 2. Prototype Pollution

**Risk**: Modifying JavaScript object prototypes

**Prevention**:
- Avoid using `Object.assign()` with user input
- Use `Object.create(null)` for dictionaries
- Validate object keys

### 3. ReDoS (Regular Expression Denial of Service)

**Risk**: Complex regex causing browser hang

**Prevention**:
- Keep regex patterns simple
- Test regex with long inputs
- Add timeout for regex operations

### 4. Dependency Vulnerabilities

**Risk**: Vulnerable third-party libraries

**Prevention**:
- We use zero dependencies (except Font Awesome CDN)
- Keep CDN resources updated
- Consider using SRI hashes

## Disclosure Policy

We follow coordinated disclosure:

1. **Private disclosure**: Security issues reported privately
2. **Fix development**: We develop and test the fix
3. **Coordinated release**: Fix released with security advisory
4. **Public disclosure**: Details disclosed after fix is deployed

## Bug Bounty

Currently, we do not have a bug bounty program. However, we deeply appreciate security researchers who responsibly disclose vulnerabilities and will:

- Credit you in our security advisories (if you wish)
- Thank you in our contributors list
- Provide public recognition for your responsible disclosure

## Security Updates

Security updates are released as:

- **Critical**: Immediate patch release
- **High**: Within 7 days
- **Medium**: Within 30 days
- **Low**: In next regular release

Security advisories will be posted on:
- GitHub Security Advisories
- Release notes
- README.md updates section

## Questions?

For security-related questions that are not vulnerabilities, you can:

- Open a discussion on GitHub Discussions
- Email us at [INSERT CONTACT EMAIL]

---

**Last Updated**: November 2025

Thank you for helping keep CalcHub secure! 🔒
