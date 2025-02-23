import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
		baseUrl: "http://localhost:5173",
		testIsolation: false,
	},
	defaultCommandTimeout: 20000,
	scrollBehavior: false,
});
