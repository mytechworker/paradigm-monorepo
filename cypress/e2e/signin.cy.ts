describe("Sign In Page", () => {
  beforeEach(() => {
    cy.task("resetDatabase");
    cy.task("seedDatabase");
    cy.visit("/admin/auth/signin");
  });

  it("should display the login form", () => {
    cy.get("h2").contains("Login").should("be.visible");
    cy.dataCy("input-email").should("be.visible");
    cy.dataCy("input-password").should("be.visible");
    cy.dataCy("submit-btn").should("be.visible");
  });

  // skiping this because of validation changes
  // it("should show validation errors when fields are empty", () => {
  //   cy.dataCy("submit-btn").click();
  //   cy.contains("Please enter email address!").should("be.visible");
  //   cy.contains("Please enter password!").should("be.visible");
  // });

  it("should disable the submit button when form is invalid", () => {
    cy.dataCy("input-email").type("invalid-email");
    cy.dataCy("input-password").type("short");
    cy.dataCy("submit-btn").should("be.disabled");
  });

  it("should enable the submit button when form is valid", () => {
    cy.dataCy("input-email").type("test@example.com");
    cy.dataCy("input-password").type("Password123");
    cy.dataCy("submit-btn").should("not.be.disabled");
  });

  it("should show error message on invalid credentials", () => {
    cy.interceptRequest("POST");
    cy.dataCy("input-email").type("wrong@example.com");
    cy.dataCy("input-password").type("WrongPassword123");
    cy.dataCy("submit-btn").click();

    // cy.contains("Invalid credentials").should("be.visible");
    cy.contains("User not found").should("be.visible");
  });

  it("should login successfully with valid credentials", () => {
    cy.interceptRequest("POST");
    cy.dataCy("input-email").type("sasuke.uchiha@gmail.com");
    cy.dataCy("input-password").type("Password123");
    cy.dataCy("submit-btn").click();

    cy.contains("Login successful").should("be.visible");
    cy.window().then((window) => {
      expect(window.localStorage.getItem("token")).to.exist;
    });
    cy.url().should("include", "/admin/category");
  });
});
