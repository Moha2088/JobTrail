import { defineConfig } from "cypress"

export default defineConfig({
    allowCypressEnv: false,
    experimentalRunAllSpecs: true,

    env: {
        SESSION_SECRET: process.env.SESSION_SECRET!
    },

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