describe('My First Test',()=>{
  it('visits the Kitchen Sink',()=>{
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()
    

    cy.url().should('include','/commands/actions')
  })
})