# Playwright DemoQA Test Automation Project

A focused test automation project for [demoqa.com](https://demoqa.com) built with TypeScript and Playwright, demonstrating modern test automation practices with emphasis on drag and drop functionality, mouse manipulations, keyboard interactions, file upload/download, and clean architecture patterns.

## 🚀 Features

- **TypeScript Support**: Full TypeScript implementation with strict type checking
- **Clean Architecture**: Page Object Model with Component Pattern for maintainable tests
- **Drag and Drop Testing**: Comprehensive drag and drop scenarios with visual feedback
- **Mouse Manipulations**: Advanced mouse interaction testing (hover, click, wheel, etc.)
- **Keyboard Interactions**: Complete keyboard simulation testing (text input, navigation, shortcuts)
- **File Upload/Download**: Comprehensive file upload and download testing with validation
- **Single Responsibility Principle**: Eliminated God Object pattern with focused components
- **Self-Descriptive Code**: No comments - code speaks for itself
- **Performance Testing**: Drag and drop, keyboard, and file upload performance assertions
- **Cross-Viewport Testing**: Mobile, tablet, and desktop viewport validation
- **Robust Test Framework**: 51 passing tests with clean architecture

## 📁 Project Structure

```
playwright-demoqa/
├── components/                    # Reusable UI Components
│   ├── DragAndDropComponent.ts   # Drag and drop operations
│   ├── MouseManipulationComponent.ts # Mouse interactions
│   ├── KeyboardInteractionComponent.ts # Keyboard interactions
│   ├── FileUploadComponent.ts    # File upload operations
│   └── TabNavigationComponent.ts # Tab navigation logic
├── pages/                        # Page Object Models
│   ├── BasePage.ts              # Base page with common functionality
│   ├── DroppablePage.ts         # Droppable page interactions
│   ├── TextBoxPage.ts           # Text box page interactions
│   └── UploadDownloadPage.ts    # Upload/download page interactions
├── data/                         # Test data and constants
│   ├── droppableTestData.ts     # Drag and drop specific data
│   ├── keyboardTestData.ts      # Keyboard interaction data
│   └── fileUploadTestData.ts    # File upload/download data
├── tests/                        # Test files
│   ├── drag-and-drop.spec.ts    # Drag and drop functionality tests
│   ├── mouse-manipulations.spec.ts # Mouse manipulation tests
│   ├── keyboard-interactions.spec.ts # Keyboard interaction tests
│   └── file-upload.spec.ts      # File upload/download tests
├── test-files/                   # Test files for upload testing
├── test-results/                 # Test results and reports (auto-generated)
├── playwright-report/            # HTML test reports (auto-generated)
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies and scripts
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AlexKalyna/playwright-demoqa.git
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

### Test Categories

```bash
# Run drag and drop tests only
npx playwright test --grep "@drag-and-drop"

# Run mouse manipulation tests only
npx playwright test --grep "@mouse-manipulations"

# Run keyboard interaction tests only
npx playwright test --grep "@keyboard-interactions"

# Run file upload tests only
npx playwright test --grep "@file-upload"

# Run specific test
npx playwright test --grep "should perform simple drag and drop operation"
```

### Test Reports

```bash
# View HTML test report
npm run test:report

# Preview latest report
npm run preview
```

## 📋 Test Coverage

### 1. Drag and Drop Tests (`tests/drag-and-drop.spec.ts`)
- **Simple Drag and Drop**: Basic drag and drop operation with verification
- **Accept Tab Functionality**: Testing acceptable and non-acceptable elements
- **Prevent Propagation**: Testing nested droppable areas
- **Visual Feedback**: Background color and cursor style verification
- **Viewport Testing**: Mobile, tablet, and desktop viewport validation
- **Performance Testing**: Drag and drop performance assertions

### 2. Mouse Manipulation Tests (`tests/mouse-manipulations.spec.ts`)
- **Hover Effects**: Cursor style changes on hover
- **Double-Click**: Double-click functionality testing
- **Keyboard Modifiers**: Shift-click and other modifier combinations
- **Performance Measurement**: Mouse interaction timing
- **Multiple Clicks**: Sequential click operations
- **Prevent Propagation**: Mouse interactions with nested elements

### 3. Keyboard Interaction Tests (`tests/keyboard-interactions.spec.ts`)
- **Basic Navigation**: Tab key navigation through form elements
- **Text Input**: Keyboard text input with various content types
- **Form Submission**: Enter and Space key form submission
- **Special Characters**: Testing with special characters and numbers
- **Performance Testing**: Keyboard input and form submission performance
- **Key Functionality**: Backspace, Delete, Arrow keys, Home, End
- **Modifier Keys**: Shift, Alt, Control key combinations
- **Focus Management**: Proper focus handling between elements
- **Rapid Input**: Multiple rapid key presses testing

### 4. File Upload/Download Tests (`tests/file-upload.spec.ts`)
- **Single File Upload**: Upload individual files with validation
- **File Validation**: File name, size, and type verification
- **Performance Testing**: Upload performance measurement
- **Drag and Drop Upload**: File upload via drag and drop
- **File Input Management**: Clear and verify file input states
- **Download Functionality**: File download testing
- **Sequential Uploads**: Multiple file uploads in sequence
- **Error Handling**: File upload error scenarios
- **Comprehensive Workflow**: End-to-end upload workflow testing

## 🏗️ Architecture Patterns

### Component Pattern
The project demonstrates clean separation of concerns through focused components:

#### **DragAndDropComponent**
Handles all drag and drop operations:
- `dragTo()` - Standard drag and drop
- `dragWithMouse()` - Manual mouse-based drag
- `verifyDropSuccess()` - Drop verification
- `verifyInitialState()` - Initial state validation
- `measurePerformance()` - Performance measurement

#### **MouseManipulationComponent**
Manages mouse interactions:
- `hoverOnElement()` - Element hovering
- `rightClickOnElement()` - Right-click operations
- `doubleClickOnElement()` - Double-click functionality
- `scrollWithMouseWheel()` - Mouse wheel scrolling
- `clickWithKeyboardModifier()` - Keyboard + mouse combinations

#### **KeyboardInteractionComponent**
Handles keyboard interactions:
- `fillTextOnElement()` - Modern text input using fill()
- `pressSequentiallyOnElement()` - Sequential key presses
- `pressKeyOnElement()` - Single key presses
- `pressKeyWithModifier()` - Modifier key combinations
- `navigateWithTab()` - Tab navigation
- `selectAllText()` - Text selection shortcuts
- `measureKeyboardInteractionPerformance()` - Performance measurement

#### **FileUploadComponent**
Handles file upload operations:
- `uploadFile()` - Single file upload
- `dragAndDropFile()` - Drag and drop file upload
- `verifyFileUploaded()` - File upload verification
- `verifyFileSize()` - File size validation
- `verifyFileType()` - File type validation
- `clearFileInput()` - Clear file input
- `downloadFile()` - File download functionality
- `measureUploadPerformance()` - Upload performance measurement

#### **TabNavigationComponent**
Handles tab navigation:
- `navigateToAcceptTab()` - Accept tab navigation
- `navigateToPreventPropagationTab()` - Prevent propagation tab
- `navigateToRevertDraggableTab()` - Revert draggable tab

### Page Object Model
#### **DroppablePage**
Main page object for droppable functionality:
- Element locators with getters
- Navigation methods
- Test orchestration methods
- Component coordination

#### **TextBoxPage**
Page object for keyboard interaction testing:
- Form element locators
- Keyboard input methods
- Form submission methods
- Output verification methods

#### **UploadDownloadPage**
Page object for file upload/download testing:
- File input locators
- Upload/download methods
- File validation methods
- Performance measurement methods

#### **BasePage**
Common functionality for all pages:
- Navigation methods
- Viewport management
- Screenshot capabilities
- Page load waiting

## 📊 Test Data Management

### **droppableTestData.ts**
Centralized constants for droppable functionality:
- Element selectors
- Viewport sizes
- Tab names
- Expected texts
- Performance thresholds

### **keyboardTestData.ts**
Centralized constants for keyboard functionality:
- Element selectors
- Keyboard keys and modifiers
- Test text data
- Performance thresholds
- Expected behaviors

### **fileUploadTestData.ts**
Centralized constants for file upload functionality:
- Element selectors
- File types and sizes
- Test file specifications
- Performance thresholds
- Expected messages and behaviors

## 🔧 Configuration

### Playwright Configuration (`playwright.config.ts`)
- **Browser**: Chromium only (focused testing)
- **Parallel Execution**: Enabled for faster test runs
- **Reporting**: HTML, JSON, and JUnit reports
- **Artifacts**: Screenshots and videos on failure
- **Base URL**: https://demoqa.com

### TypeScript Configuration (`tsconfig.json`)
- **Target**: ES2022
- **Strict Mode**: Enabled
- **Path Mapping**: Clean imports
- **Module Resolution**: CommonJS

## 🎯 Best Practices Demonstrated

1. **Single Responsibility Principle**: Each class has one clear purpose
2. **Component Pattern**: Reusable UI components for specific functionality
3. **Page Object Model**: Separation of test logic from page interactions
4. **Self-Descriptive Code**: No comments - method names and structure speak for themselves
5. **Data-Driven Testing**: Centralized test data management
6. **Performance Testing**: Drag and drop, keyboard, and file upload performance validation
7. **Cross-Viewport Testing**: Responsive design validation
8. **Clean Architecture**: Eliminated God Object pattern
9. **YAGNI Principle**: Only essential code, no unnecessary features
10. **Modern Playwright APIs**: Using fill() instead of deprecated type()

## 🚀 Key Achievements

- **51 Passing Tests**: All tests execute successfully
- **Clean Architecture**: No God Objects, focused responsibilities
- **Maintainable Code**: Easy to extend and modify
- **Robust Testing**: Comprehensive drag and drop, mouse, keyboard, and file upload coverage
- **Performance Focused**: Performance assertions for all operations
- **Minimal Codebase**: Only essential files and functionality
- **Modern APIs**: Using latest Playwright methods and best practices

## 📝 Scripts Available

```bash
# Test Execution
npm test                    # Run all tests
npm run test:headed        # Run with visible browser
npm run test:debug         # Run in debug mode
npm run test:ui            # Run with Playwright UI

# Development
npm run type-check         # TypeScript type checking
npm run clean              # Clean generated files

# Reports
npm run test:report        # Show HTML report
npm run preview            # Preview latest report
```

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
   - Check network connectivity to demoqa.com
   - Verify the website is accessible
   - Review test data validity

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [DemoQA Website](https://demoqa.com)

## 📄 License

This project is licensed under the ISC License.

---

**Note**: This project demonstrates professional test automation practices with a focus on drag and drop functionality, mouse manipulations, keyboard interactions, and file upload/download operations. The architecture follows clean code principles and YAGNI (You Aren't Gonna Need It) principle for maintainability and extensibility.