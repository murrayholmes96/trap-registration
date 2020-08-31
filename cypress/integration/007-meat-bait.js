describe('Comply page directly', function () {
    it('should prevent access', function () {
      cy.visit('/meat-bait', {failOnStatusCode: false});
      cy.get('h1').should('contain', 'there is a problem with the service');
    });
  });
  
  describe('Meat bait page ', function () {
    beforeEach(() => {
       // GET `/start`
       cy.visit('/start');
  
       // POST `/start`
       cy.get('#main-content form button.govuk-button').click();
   
       // ~GET `/gdpr`~
       // POST `/gdpr`
       cy.get('#main-content form button.govuk-button').click();
   
       // ~GET `/conviction`~
       // CLICK no
       cy.get('#main-content form input[type="radio"][value="no"]').click();
       // POST `/conviction`
       cy.get('#main-content form button.govuk-button').click();
   
       // ~GET `/eligible`~
       // POST `/eligible`
       cy.get('#main-content form button.govuk-button').click();
   
       // ~GET `/general`~
       // CLICK GLO1
       cy.get('#main-content form input[type="checkbox"]#general').click();
       // POST `/general`
       cy.get('#main-content form button.govuk-button').click();
 
      // ~GET `/comply`~
      // CLICK yes
      cy.get('#main-content form input[type="checkbox"]#comply').click();
      // POST `/comply`
      cy.get('#main-content form button.govuk-button').click();
    });
  
    it('should allow access if the user visits all the pages in order', function () {
      cy.visit('/meat-bait');
      cy.get('h1').should('contain', 'intend to use meat baits');
    });

    it('"no" radio + main button should navigate to details', function () {
        cy.visit('/meat-bait');
        cy.get('#main-content form input[type="radio"][value="no"]').click();
        cy.get('#main-content form button.govuk-button').click();
        cy.url().should('include', '/details');
    });
    
    it('"yes" radio + main button should navigate to details', function () {
    cy.visit('/meat-bait');
    cy.get('#main-content form input[type="radio"][value="yes"]').click();
    cy.get('#main-content form button.govuk-button').click();
    cy.url().should('include', '/details');
    });

});