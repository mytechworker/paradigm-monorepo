type Method = "POST" | "GET" | "DELETE";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
    dataCy(value: string): Chainable<Element>;
    interceptRequest(method: Method): Chainable<null>;
  }
}
