# Playwright DemoQA Test Automation Project

A comprehensive test automation project for [demoqa.com](https://demoqa.com) built with TypeScript and Playwright, demonstrating modern test automation practices including Page Object Model, data-driven testing, and cross-browser testing.

## 🚀 Features

- **TypeScript Support**: Full TypeScript implementation with strict type checking
- **Page Object Model**: Well-structured page objects for maintainable tests
- **Cross-Browser Testing**: Support for Chrome, Firefox, Safari, and mobile browsers
- **Data-Driven Testing**: Reusable test data and dynamic data generation
- **Comprehensive Test Coverage**: Home page, forms, and end-to-end workflows
- **Responsive Testing**: Mobile and tablet viewport testing
- **Accessibility Testing**: Keyboard navigation and accessibility checks
- **Performance Testing**: Load time verification and performance monitoring
- **Visual Testing**: Screenshot capture for visual regression testing

## 📁 Project Structure

```
playwright-demoqa/
├── src/
│   ├── pages/           # Page Object Models
│   │   ├── BasePage.ts  # Base page with common functionality
│   │   ├── HomePage.ts  # Home page interactions
│   │   └── FormsPage.ts # Forms page interactions
│   ├── data/            # Test data
│   │   └── testData.ts  # Form data and test constants
│   └── utils/           # Utility functions
│       └── testHelpers.ts # Helper functions for testing
├── tests/               # Test files
│   ├── home.spec.ts     # Home page tests
│   ├── forms.spec.ts    # Forms functionality tests
│   └── e2e.spec.ts      # End-to-end workflow tests
├── screenshots/         # Test screenshots (auto-generated)
├── test-results/        # Test results and reports (auto-generated)
├── playwright-report/   # HTML test reports (auto-generated)
├── playwright.config.ts # Playwright configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd playwright-demoqa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run test:install
   ```

4. **Verify setup**
   ```bash
   npm run type-check
   ```

## 🧪 Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with debug mode
npm run test:debug

# Run tests with UI mode
npm run test:ui
```

### Browser-Specific Testing

```bash
# Run tests on specific browsers
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:mobile
```

### Advanced Test Options

```bash
# Run tests in parallel
npm run test:parallel

# Run tests with retries
npm run test:retry

# Update visual snapshots
npm run test:update-snapshots
```

### Test Reports

```bash
# View HTML test report
npm run test:report

# Preview latest report
npm run preview
```

## 📋 Test Categories

### 1. Home Page Tests (`tests/home.spec.ts`)
- Page loading and navigation
- Card visibility and functionality
- Responsive design verification
- Accessibility testing
- Cross-browser compatibility

### 2. Forms Tests (`tests/forms.spec.ts`)
- Form filling and submission
- Data validation
- Modal interactions
- File upload handling
- Special character handling

### 3. End-to-End Tests (`tests/e2e.spec.ts`)
- Complete user workflows
- Cross-browser navigation
- Performance testing
- Error handling
- Data persistence

## 🏗️ Page Object Model

### BasePage
Provides common functionality for all page objects:
- Navigation methods
- Element interaction helpers
- Screenshot capabilities
- Retry mechanisms

### HomePage
Handles home page interactions:
- Card navigation
- Element verification
- Responsive testing

### FormsPage
Manages form functionality:
- Form filling
- Data submission
- Modal handling
- Validation testing

## 📊 Test Data Management

The project includes comprehensive test data management:

- **Static Test Data**: Predefined form data sets
- **Dynamic Data Generation**: Random data generation for testing
- **Data Validation**: Email, phone number, and format validation
- **Reusable Data**: Shared test constants and URLs

## 🔧 Configuration

### Playwright Configuration (`playwright.config.ts`)
- Multi-browser support (Chrome, Firefox, Safari, Mobile)
- Parallel test execution
- Screenshot and video capture on failure
- HTML, JSON, and JUnit reporting
- Custom timeouts and retries

### TypeScript Configuration (`tsconfig.json`)
- Strict type checking
- Path mapping for clean imports
- Source map generation
- Module resolution settings

## 📈 Best Practices Demonstrated

1. **Page Object Model**: Separation of test logic from page interactions
2. **Data-Driven Testing**: Reusable test data and dynamic generation
3. **Cross-Browser Testing**: Consistent behavior across browsers
4. **Responsive Testing**: Mobile and tablet compatibility
5. **Accessibility Testing**: Keyboard navigation and screen reader support
6. **Error Handling**: Robust error handling and recovery
7. **Performance Testing**: Load time verification
8. **Visual Testing**: Screenshot capture for regression testing

## 🚀 CI/CD Integration

The project is ready for CI/CD integration with:
- Cross-browser testing support
- Parallel execution capabilities
- Comprehensive reporting
- Screenshot and video artifacts
- Retry mechanisms for flaky tests

## 📝 Contributing

1. Follow the existing code structure and patterns
2. Add appropriate TypeScript types
3. Include comprehensive test coverage
4. Update documentation as needed
5. Run linting and type checking before committing

## 🐛 Troubleshooting

### Common Issues

1. **Browser Installation Issues**
   ```bash
   npm run test:install
   ```

2. **TypeScript Errors**
   ```bash
   npm run type-check
   ```

3. **Test Failures**
   - Check network connectivity
   - Verify demoqa.com is accessible
   - Review test data validity

4. **Performance Issues**
   - Reduce parallel workers: `npm run test --workers=2`
   - Increase timeouts in configuration

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [DemoQA Website](https://demoqa.com)

## 📄 License

This project is licensed under the ISC License.

---

**Note**: This project is designed for educational and demonstration purposes. The tests are specifically tailored for the demoqa.com website and may need adjustments for other applications. 