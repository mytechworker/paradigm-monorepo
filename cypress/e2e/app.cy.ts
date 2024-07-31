import { getHeading } from "../support/app.po";

describe("paradigm-monorepo-e2e", () => {
  beforeEach(() => cy.visit("/"));

  it("should display welcome message", () => {
    cy.login("my-email@something.com", "myPassword");

    // Function helper example, see `../support/app.po.ts` file
    getHeading().contains(/Welcome/);
  });
});
