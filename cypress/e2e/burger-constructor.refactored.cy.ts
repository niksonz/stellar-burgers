const BASE_URL = 'https://norma.nomoreparties.space/api';
const CRYSTAL_INGREDIENT = `[data-cy=${'643d69a5c3f7b9001cfa0948'}]`;
const FALLEAN_FRUIT = `[data-cy=${'643d69a5c3f7b9001cfa0947'}]`;
const ANTARIAN_SAUCE = `[data-cy=${'643d69a5c3f7b9001cfa0945'}]`;
const FLUORESCENT_BUN = `[data-cy=${'643d69a5c3f7b9001cfa093d'}]`;

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');
  cy.intercept('POST', `${BASE_URL}/auth/login`, { fixture: 'user.json' }).as('login');
  cy.intercept('GET', `${BASE_URL}/auth/user`, { fixture: 'user.json' }).as('getUser');
  cy.intercept('POST', `${BASE_URL}/orders`, {
    statusCode: 200,
    fixture: 'orderResponse.json'
  }).as('postOrder');

  cy.visit('/');
  cy.wait('@getIngredients');
  cy.viewport(1440, 800);
});

describe('Ingredient Management in Constructor', () => {
  it('should increment ingredient counter', () => {
    cy.get('.constructor', { timeout: 10000 }).should('exist');
    cy.get(CRYSTAL_INGREDIENT).children('button').click();
    cy.get('.constructor').should('contain', 'Кристалл');
  });
});

describe('Ingredient Modal Behavior', () => {
  it('should open ingredient modal', () => {
    cy.get(CRYSTAL_INGREDIENT).children().first().click();
    cy.get('#modal', { timeout: 10000 }).should('exist').and('be.visible');
    cy.get('#modal').should('contain', 'Кристалл марсианских альфа-сахаридов');
  });

  it('should close modal with button', () => {
    cy.get(CRYSTAL_INGREDIENT).children().first().click();
    cy.get('#modal').should('be.visible');
    cy.get('#modal button.close').click();
    cy.get('#modal').should('not.exist');
  });

  it('should close modal by overlay click', () => {
    cy.get(CRYSTAL_INGREDIENT).children().first().click();
    cy.get('#modal').should('be.visible');
    cy.get('#modal').click('topLeft');
    cy.get('#modal').should('not.exist');
  });
});

describe('Burger Assembly Process', () => {
  it('should allow adding bun and ingredient', () => {
    cy.get(FLUORESCENT_BUN).trigger('dragstart');
    cy.get('.constructor').trigger('drop');

    cy.get(CRYSTAL_INGREDIENT).trigger('dragstart');
    cy.get('.constructor').trigger('drop');

    cy.get('.constructor').should('contain', 'Кристалл');
    cy.get('.constructor').should('contain', 'флуоресцентная булка R2-D3');
  });

  it('should allow making order', () => {
    cy.get('[data-testid="login-link"]').click();
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.wait('@getUser');

    cy.get(FLUORESCENT_BUN).trigger('dragstart');
    cy.get('.constructor').trigger('drop');

    cy.get(CRYSTAL_INGREDIENT).trigger('dragstart');
    cy.get('.constructor').trigger('drop');

    cy.get('button.place-order').click();
    cy.wait('@postOrder');

    cy.get('#modal').should('contain', 'Ваш заказ начали готовить');
  });
});