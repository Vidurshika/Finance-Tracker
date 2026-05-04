// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
// ***********************************************

// Custom command for login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('input[placeholder*="email" i]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button').contains(/login/i).click()
})

// Custom command to clear localStorage
Cypress.Commands.add('clearLocalStorage', () => {
  cy.window().then((win) => {
    win.localStorage.clear()
  })
})
