describe('Cypress Playground', () => {

  beforeEach(() => {
    cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html')
  })

  it('shows a promotional-banner', () => {
    cy.get('#promotional-banner').should('be.visible')
  })

  it('click the Subscrible button and shows a success mensage', () => {
    cy.contains('button', 'Subscribe').click()
    cy.contains(
      '#success', 
      "You've been successfully subscribed to our newsletter.")
      .should('be.visible')
  })

  it('types in a input which "signs" a form, then asserts it is signed', () => {
    cy.get('#signature-textarea').type('Maurício Miranda')
    cy.contains('#signature', 'Maurício Miranda').should('be.visible')
  })

  it('types in the signature field, checks the checkbox to see the preview, then unchecks it', () => {
    cy.get('#signature-textarea-with-checkbox').type('Maurício Miranda')
    cy.get('#signature-checkbox').check()
    cy.contains('#signature-triggered-by-check', 'Maurício Miranda').should('be.visible')
    cy.get('#signature-checkbox').uncheck()
    cy.contains('#signature-triggered-by-check', 'Maurício Miranda').should('not.exist')
  });

  it('checks both possible radios and asserts if it is "on" or "off"', () => {
    cy.contains('#on-off', 'ON').should('be.visible')
    cy.get('#off').check()
    cy.contains('#on-off', 'OFF').should('be.visible')
    cy.contains('#on-off', 'ON').should('not.exist')
    cy.get('#on').check()
    cy.contains('#on-off', 'ON').should('be.visible')
    cy.contains('#on-off', 'OFF').should('not.exist')
  })

  it('selects a type via the dropdown field and asserts on the selection', () => {

    cy.contains('p', "You haven't selected a type yet.").should('be.visible')

    cy.get('#selection-type').select(3)

    cy.contains('p', "You've selected: VIP").should('be.visible')

  })

  it('select multiple fruits via dropdown field and asserts on the selection', () => {
    cy.contains('p', "You haven't selected any fruit yet.").should('be.visible')

    cy.get('#fruit').select(['apple','banana', 'cherry'])

    cy.contains('p', "You've selected the following fruits: apple, banana, cherry").should('be.visible')
  })
  it('checks both possible radios and asserts if it is "on" or "off"', () => {
    cy.contains('#on-off', 'ON').should('be.visible')
    cy.get('#off').check()
    cy.contains('#on-off', 'OFF').should('be.visible')
    cy.contains('#on-off', 'ON').should('not.exist')
    cy.get('#on').check()
    cy.contains('#on-off', 'ON').should('be.visible')
    cy.contains('#on-off', 'OFF').should('not.exist')
  });

  it('Uploads a file and asserts the correct file name appears as a paragraph', () => {
    cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json')
    cy.contains('p', "The following file has been selected for upload: example.json").should('be.visible')
  });

  it('click a button and triggers a request', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1').as('gettodo')
    cy.contains('button', 'Get TODO').click()
    cy.wait('@gettodo').its('response.statusCode').should('be.equal', 200)
    cy.get('#intercept > ul > :nth-child(1)').should('be.visible')
    cy.contains('li', 'TODO ID: 1').should('be.visible')
    cy.contains('li', 'Title: delectus aut autem').should('be.visible')
    cy.contains('li', 'Completed: false').should('be.visible')
    cy.contains('li', 'User ID: 1').should('be.visible')
  });  
})
