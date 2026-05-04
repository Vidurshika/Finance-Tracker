describe('Navigation E2E Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('should redirect to login when not authenticated', () => {
    cy.visit('/dashboard')
    cy.url().should('include', '/login')
  })

  it('should navigate between auth pages', () => {
    cy.visit('/login')
    cy.contains(/sign up/i).click()
    cy.url().should('include', '/signup')
    
    cy.contains(/login/i).click()
    cy.url().should('include', '/login')
  })

  // Requires authentication
  it.skip('should navigate between dashboard pages when logged in', () => {
    // Assuming user is logged in with token
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'mock-token')
    })
    
    cy.visit('/dashboard')
    cy.contains(/income/i).click()
    cy.url().should('include', '/income')
    
    cy.contains(/expense/i).click()
    cy.url().should('include', '/expense')
    
    cy.contains(/dashboard/i).click()
    cy.url().should('include', '/dashboard')
  })
})
