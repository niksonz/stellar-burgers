<<<<<<< HEAD
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
=======
import { defineConfig } from 'cypress';
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000/',
    setupNodeEvents(on, config) {}
  }
>>>>>>> 36a7110ee045e5115498695bf78e858e83e62b82
});
