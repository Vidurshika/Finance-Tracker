describe('Login E2E Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/login')
  })

  it('should display login page correctly', () => {
    cy.contains(/login/i).should('be.visible')
    cy.get('input[placeholder*="email" i]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
  })

  it('should show validation error for invalid email', () => {
    cy.get('input[placeholder*="email" i]').type('invalid-email')
    cy.get('input[type="password"]').type('password123')
    cy.get('button').contains(/login/i).click()
    
    // Check for error message
    cy.contains(/valid email/i).should('be.visible')
  })

  it('should show error for empty password', () => {
    cy.get('input[placeholder*="email" i]').type('test@example.com')
    cy.get('button').contains(/login/i).click()
    
    cy.contains(/enter the password/i).should('be.visible')
  })

  it('should navigate to signup page', () => {
    cy.contains(/sign up/i).click()
    cy.url().should('include', '/signup')
  })

  // Integration test - requires backend running
  it.skip('should login successfully with valid credentials', () => {
    cy.get('input[placeholder*="email" i]').type('test@example.com')
    cy.get('input[type="password"]').type('ValidPassword123')
    cy.get('button').contains(/login/i).click()
    
    // Should redirect to dashboard
    cy.url().should('include', '/dashboard')
    cy.window().its('localStorage.token').should('exist')
  })
})
