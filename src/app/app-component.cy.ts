import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should render correctly', () => {
    cy.mount(AppComponent).then(() => {
      // Assert that the component is rendered correctly
      cy.get('.content span').should('contain', 'ng-base app is running!');
    });
  });
});
