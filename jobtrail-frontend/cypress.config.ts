import { defineConfig } from "cypress"

export default defineConfig({
    allowCypressEnv: false,
    experimentalRunAllSpecs: true,

    e2e: {
        setupNodeEvents(on, config) {
        // implement node event listeners here
        },
    },

    component: {
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
})