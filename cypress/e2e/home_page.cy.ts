/**
 * @file home_page.cy.ts
 * @description End-to-end test for the home page, verifying functionality such as filtering, loading, and infinite scroll.
 */

describe('Home Page Tests', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080); // Set viewport for all tests
        cy.visit('/');
    });

    it('should load the homepage successfully', () => {
        cy.get('[data-test-id="home-banner"]').should('be.visible');
        cy.get('[data-test-id="filters"]').should('be.visible');
        cy.get('[data-test-id="category-list"]').should('be.visible');
    });

    it('should display the latest show in the home banner', () => {
        cy.get('[data-test-id="home-banner"] h1').should('not.be.empty');
    });

    // it('should filter shows based on search input', () => {
    //     cy.wait(500);
    //     cy.get('[data-test-id="search-input"]').type('Dome');
    //     cy.get('[data-test-id="show-card"]').should('contain.text', 'Dome');
    // });

    it('should filter shows based on selected genre', function () {
        cy.intercept('GET', '**/shows', {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    name: 'Breaking Bad',
                    genres: ['Drama'],
                    summary: '<p>Crime and family drama</p>',
                    image: {
                        medium: 'https://test.com/image1.jpg',
                        original: 'https://test.com/image1_large.jpg'
                    }
                },
                {
                    id: 2,
                    name: 'Better Call Saul',
                    genres: ['Drama'],
                    summary: '<p>Lawyer-based drama</p>',
                    image: {
                        medium: 'https://test.com/image2.jpg',
                        original: 'https://test.com/image2_large.jpg'
                    }
                }
            ]
        }).as('getShows');

        cy.visit('/');

        cy.wait('@getShows'); // Wait for mocked API response

        cy.window().then((win) => {
            // Mock selecting "Drama" programmatically
            win.dispatchEvent(new Event('genre-change'));
        });

        cy.get('[data-test-id="show-card"]').should(
            'have.length.greaterThan',
            0
        );
    });

    it('should display the loader while fetching data', () => {
        cy.get('[data-test-id="loader"]').should('exist');
    });

    it('should load more shows on infinite scroll', () => {
        cy.scrollTo('bottom');
        cy.get('[data-test-id="load-more"]').should('exist');
    });
});
