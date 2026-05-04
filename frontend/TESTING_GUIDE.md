# Frontend Testing Guide - Finance Tracker

## 📋 Testing Stack Overview

### **Vitest** - Component/Unit Testing
- Fast, Vite-native testing framework
- Tests individual components and functions
- Uses React Testing Library for component testing

### **Cypress** - End-to-End (E2E) Testing  
- Tests complete user workflows
- Simulates real user interactions in a browser
- Tests the entire application flow

---

## 🚀 Quick Start

### Running Vitest Tests

```bash
# Run all unit/component tests (watch mode)
npm test

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Running Cypress Tests

```bash
# Open Cypress interactive GUI
npm run cypress

# Run Cypress tests in headless mode
npm run cypress:headless

# Run E2E tests (auto-starts dev server)
npm run test:e2e
```

---

## 📁 Test File Structure

```
finance-tracker/
├── src/
│   └── test/
│       ├── setup.js              # Vitest configuration
│       ├── Login.test.jsx        # Login component tests
│       ├── InfoCard.test.jsx     # InfoCard component tests
│       └── helper.test.js        # Utility function tests
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js          # Login E2E tests
│   │   ├── signup.cy.js         # Signup E2E tests
│   │   └── navigation.cy.js     # Navigation E2E tests
│   └── support/
│       ├── commands.js           # Custom Cypress commands
│       └── e2e.js               # Cypress setup
├── vitest.config.js              # Vitest configuration
└── cypress.config.js             # Cypress configuration
```

---

## 🧪 Testing Process Workflow

### **1. Component Testing with Vitest (Unit Tests)**

#### What to Test:
- ✅ Component renders correctly
- ✅ User interactions (clicks, inputs)
- ✅ Form validations
- ✅ Conditional rendering
- ✅ Utility functions

#### Example Test Pattern:

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render with correct text', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle button click', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // Assert expected behavior
  });
});
```

#### Key Testing Library Queries:
- `screen.getByText()` - Find by text content
- `screen.getByRole()` - Find by ARIA role (button, textbox, etc.)
- `screen.getByPlaceholderText()` - Find input by placeholder
- `screen.getByTestId()` - Find by data-testid attribute

---

### **2. E2E Testing with Cypress**

#### What to Test:
- ✅ Complete user journeys (login → dashboard → add expense)
- ✅ Page navigation
- ✅ Form submissions with API calls
- ✅ Error handling
- ✅ Authentication flows

#### Example E2E Test Pattern:

```javascript
describe('Feature E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should complete login flow', () => {
    // Type email
    cy.get('input[placeholder*="email" i]').type('test@example.com');
    
    // Type password
    cy.get('input[type="password"]').type('password123');
    
    // Click submit
    cy.get('button').contains(/login/i).click();
    
    // Assert redirect
    cy.url().should('include', '/dashboard');
  });
});
```

#### Cypress Best Practices:
- Use `cy.visit()` to navigate to pages
- Use `cy.get()` to find elements
- Use `cy.contains()` for text-based selection
- Use `should()` for assertions
- Use custom commands (in `commands.js`) for repeated actions

---

## 📝 Writing Your Own Tests

### Step 1: Create Test File

**For Component Tests (Vitest):**
```bash
# Create in src/test/
touch src/test/YourComponent.test.jsx
```

**For E2E Tests (Cypress):**
```bash
# Create in cypress/e2e/
touch cypress/e2e/yourFeature.cy.js
```

### Step 2: Write Test Structure

```javascript
describe('Feature/Component Name', () => {
  // Runs before each test
  beforeEach(() => {
    // Setup code
  });

  // Individual test case
  it('should do something specific', () => {
    // Arrange: Setup test data
    // Act: Perform action
    // Assert: Check result
  });
});
```

### Step 3: Run Tests

```bash
npm test                    # Vitest
npm run cypress            # Cypress GUI
```

---

## 🎯 Testing Checklist for QA Practice

### Component Testing (Vitest)
- [ ] Test Login validation (email format, empty fields)
- [ ] Test SignUp validation
- [ ] Test InfoCard rendering with props
- [ ] Test helper functions (validateEmail, etc.)
- [ ] Test modal open/close behavior
- [ ] Test form input changes
- [ ] Test button click handlers

### E2E Testing (Cypress)
- [ ] Test complete login flow
- [ ] Test complete signup flow
- [ ] Test navigation between pages
- [ ] Test adding new expense
- [ ] Test adding new income
- [ ] Test viewing dashboard data
- [ ] Test logout functionality
- [ ] Test error messages on failed login

---

## 🐛 Common Testing Scenarios

### Test Form Validation
```javascript
it('should show error for invalid email', async () => {
  render(<Login />);
  
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'invalid-email' }
  });
  
  fireEvent.click(screen.getByRole('button'));
  
  await waitFor(() => {
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });
});
```

### Test API Calls (with Mock)
```javascript
import { vi } from 'vitest';

vi.mock('../utils/axiosinstance');

it('should handle successful login', async () => {
  axiosInstance.post.mockResolvedValue({
    data: { token: 'fake-token', user: { name: 'Test' } }
  });
  
  // Test login logic
});
```

### Test User Navigation
```javascript
cy.visit('/login');
cy.get('a').contains(/sign up/i).click();
cy.url().should('include', '/signup');
```

---

## 📊 Coverage Reports

Run coverage to see which code is tested:

```bash
npm run test:coverage
```

Opens a report showing:
- Lines covered
- Functions covered
- Branches covered
- Statements covered

---

## 🔧 Troubleshooting

### Vitest Issues
- **Tests not found**: Ensure files end with `.test.js` or `.test.jsx`
- **Component not rendering**: Check if BrowserRouter is wrapped around component
- **Mock not working**: Import mocks before the component

### Cypress Issues
- **Cannot find element**: Use `cy.wait()` or increase timeout
- **Tests fail in headless mode**: Check viewport size in config
- **Backend not running**: Use `test:e2e` script which auto-starts server

---

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Cypress Documentation](https://docs.cypress.io/)

---

## 🎓 Next Steps for Practice

1. ✅ Run existing tests to see them pass
2. ✅ Break a test intentionally to see it fail
3. ✅ Write a test for AddExpenseForm component
4. ✅ Create E2E test for adding an expense
5. ✅ Add tests for dashboard data display
6. ✅ Practice TDD (Test-Driven Development) - write test first, then code

---

**Happy Testing! 🚀**
