# Testing Quick Reference

## Commands Cheat Sheet

### Vitest (Component/Unit Tests)
```bash
npm test                  # Run tests in watch mode
npm run test:ui          # Open Vitest UI
npm run test:coverage    # Generate coverage report
```

### Cypress (E2E Tests)
```bash
npm run cypress          # Open Cypress GUI
npm run cypress:headless # Run in terminal (no GUI)
npm run test:e2e        # Start server + run E2E
```

## Common Test Patterns

### Vitest - Component Test
```javascript
import { render, screen, fireEvent } from '@testing-library/react';

it('test name', () => {
  render(<Component />);
  expect(screen.getByText('text')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button'));
});
```

### Cypress - E2E Test
```javascript
it('test name', () => {
  cy.visit('/page');
  cy.get('input').type('value');
  cy.contains('button').click();
  cy.url().should('include', '/next');
});
```

## Useful Selectors

### Testing Library (Vitest)
- `screen.getByText('text')`
- `screen.getByRole('button')`
- `screen.getByPlaceholderText('Email')`
- `screen.getByTestId('test-id')`

### Cypress
- `cy.get('selector')`
- `cy.contains('text')`
- `cy.get('input[type="email"]')`
- `cy.get('[data-testid="id"]')`

## Test Structure
```javascript
describe('Feature', () => {
  beforeEach(() => { /* setup */ });
  
  it('should do X', () => {
    // Arrange
    // Act
    // Assert
  });
});
```
