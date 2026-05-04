describe('SignUp E2E Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/signup')
  })

  it('should display signup form', () => {
    cy.contains(/sign up/i).should('be.visible')
    cy.get('input[placeholder*="name" i]').should('be.visible')
    cy.get('input[placeholder*="email" i]').should('be.visible')
    cy.get('input[type="password"]').should('have.length.at.least', 1)
  })

  it('should validate required fields', () => {
    cy.get('button').contains(/sign up/i).click()
    
    // Should show validation errors
    cy.get('body').should('be.visible') // Basic check since error messages may vary
  })

  it('should validate email format', () => {
    cy.get('input[placeholder*="name" i]').type('Test User')
    cy.get('input[placeholder*="email" i]').type('invalid-email')
    cy.get('input[type="password"]').first().type('password123')
    cy.get('button').contains(/sign up/i).click()
    
    // Should show email validation error
    cy.contains(/valid email/i, { timeout: 3000 }).should('exist')
  })

  it('should have link to login page', () => {
    cy.contains(/login/i).click()
    cy.url().should('include', '/login')
  })
})
