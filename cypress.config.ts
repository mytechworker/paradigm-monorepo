import { loadEnvConfig } from "@next/env";
import { defineConfig } from "cypress";
import path = require("path");

const { combinedEnv } = loadEnvConfig(
  path.resolve(__dirname, "./packages/client")
);

import config from "./cypress/config";
// import resetDatabase from "./cypress/tasks/resetDatabase";
// import seedDatabase from "./cypress/tasks/seedDatabase";

export default defineConfig({
  e2e: {
    env: combinedEnv,
    baseUrl: config.applicationBaseUrl,
    retries: {
      runMode: 3,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // tasks
      // we'll use prisma to seed database and use prisma db for testing purposes
      // on("task", {
      //   seedDatabase,
      //   resetDatabase,
      // });
    },
  },
});
