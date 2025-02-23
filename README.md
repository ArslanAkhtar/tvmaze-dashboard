# Hey reviewer! This is the  Live demo

## Tech stack - [live demo here](https://grand-buttercream-53409f.netlify.app/)

### Why Vue3?

I chose the Vue.js library with TypeScript for this project because of its rich feature set and built-in state management capabilities. Ultimately, the choice of framework depends on the project's specific needs, as each has its own strengths and trade-offs. It’s like asking, 'Batman or Superman?'—both have their superpowers, and it just depends on what you're looking for! 😄

### Why Tailwind for Styling? 

I chose Tailwind CSS for this project because I wanted to build the UI from scratch, giving me full creative freedom to design and implement custom styles, animations, and interactive elements. Tailwind allowed me to craft unique animations for **season serials** and custom **arrows for the "Explore All" feature**, without being constrained by pre-built UI libraries.

#### 🚀 Benefits of Using Tailwind CSS  

#### ✅ Utility-First Approach  
Tailwind provides low-level utility classes, enabling rapid styling without writing custom CSS files. This made the development process more efficient and ensured consistency in styles.

#### ✅ Highly Customizable  
Since I wanted to implement my own unique UI elements, Tailwind’s configuration options made it easy to tweak **colors, typography, spacing, and animations** to match the project’s design language.

#### ✅ Responsive by Default  
Tailwind’s built-in **responsive design system** made it effortless to create a seamless experience across different screen sizes without manually writing media queries.

#### ✅ Performance Optimization  
Unused styles are **automatically removed in production** (via PurgeCSS), keeping the final CSS bundle lightweight and improving load times.

#### ✅ Faster Development  
Instead of switching between CSS files and the component code, Tailwind allowed me to style everything **directly within Vue templates**, streamlining the workflow and reducing context switching.

By using **Tailwind CSS**, I was able to create a **visually engaging** and **highly customized** user experience while maintaining **clean, maintainable, and scalable** code. ✨



### Leveraging Vue `ref` and Composable API

In this project, I made extensive use of Vue's `ref` and the Composable API to manage state and enhance the overall development experience. Here's why I chose to use these features:

### Vue `ref`

- **Reactivity**: Vue's `ref` provides reactivity, allowing me to efficiently manage and react to changes in variables and data. This reactivity simplifies state management and ensures that the UI updates automatically when data changes.

- **Direct DOM Interaction**: `ref` enables direct interaction with the DOM when necessary, making it easier to work with elements, forms, and user interactions. This flexibility was particularly useful for creating a dynamic and responsive user interface.

- **Simplicity**: `ref` is straightforward to use, making it an excellent choice for managing simple state variables, such as input values, counters, and flags.

### Composable API

The Composable API is a set of reusable functions and logic that can be shared across different parts of the application. Here's how I benefited from using the Composable API:

- **Modularity**: Composables promote a modular code structure, allowing me to encapsulate and reuse logic for various aspects of the application, such as API requests, data transformations, and state management.

- **Code Reusability**: Composables encourage code reusability, reducing duplication and promoting a cleaner and more maintainable codebase. This made it easier to scale and enhance the application.

- **Separation of Concerns**: By isolating specific functionality into composable functions, I achieved a clearer separation of concerns within the codebase. This separation improved code readability and made it easier to reason about different parts of the application.

- **Testing**: Composables can be easily tested in isolation, enhancing the overall testability of the application and ensuring that individual pieces of functionality work as expected.

Overall, the combination of Vue's `ref` for reactivity and the Composable API for code organization and reusability contributed to a more efficient development process and a well-structured Vue.js TV shows application.



### Testing with Vitest and Cypress

I selected [Vitest](https://github.com/egoist/vitest) for unit testing  and [Cypress](https://www.cypress.io/) for a basic e2e test.

### Vitest

[Vitest](https://github.com/egoist/vitest) is a modern and versatile test runner designed specifically for Vue 3 applications. Here are the reasons why I opted for Vitest:

- **Vue 3 Compatibility**: Vitest is tailored for Vue 3, which aligns perfectly with the Vue 3 ecosystem used in this project. It provides a seamless testing experience for Vue 3 components and features.

- **Lightweight and Fast**: Vitest is lightweight and efficient, allowing for speedy test execution. This is essential for maintaining a quick feedback loop during development.

- **Comprehensive Vue Testing**: Vitest supports various testing aspects, including unit tests, component tests, and end-to-end tests, covering the full spectrum of Vue 3 application testing needs.

- **Integration with Vue Ecosystem**: Vitest integrates seamlessly with Vue's testing utilities, making it easier to write and run tests for Vue components and features.

- **Snapshot Testing**: I used Vitest's snapshot testing feature to capture and verify component snapshots, ensuring that UI changes are intentional and controlled.

### Cypress

[Cypress](https://www.cypress.io/) is an end-to-end testing framework known for its simplicity and powerful testing capabilities. Here's why Cypress was the right choice for this project:

- **Real-Time Testing**: Cypress allows for real-time testing in the browser, providing an interactive testing environment. This is especially valuable for visually inspecting and debugging UI behavior.

- **End-to-End Testing**: Cypress excels in end-to-end testing scenarios, allowing me to simulate user interactions and verify the application's functionality from a user's perspective.

- **Cross-Browser Testing**: Cypress supports cross-browser testing, ensuring that the application functions consistently across different browsers, a crucial aspect of delivering a high-quality web application.

- **Integration with Vue**: Cypress has excellent integration with Vue applications, making it easy to select Vue components, trigger events, and assert the application's behavior.

- **Detailed Test Reports**: Cypress generates detailed test reports and logs, making it straightforward to diagnose issues and failures during testing.

By combining Vitest and Cypress, I was able to cover the full spectrum of testing needs for this Vue.js TV shows application. Vitest handled unit and component testing, while Cypress provided end-to-end testing capabilities, ensuring the reliability and quality of the application.


### framer-motion for animations

# Screenshot of the app

![app-screenshot](./public/home.png?raw=true)
![app-screenshot](./public/home-2.png?raw=true)
![app-screenshot](./public/result-not-found.png?raw=true)
![app-screenshot](./public/show-detail.png?raw=true)
![app-screenshot](./public/episodes.png?raw=true)
![app-screenshot](./public/page-not-found.png?raw=true)


## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh         
npm run test:e2e
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

Open the application in your browser at http://localhost:5173





## 🚀 Running the Project with Docker

This project is containerized using **Docker** to streamline development, testing, and execution. It leverages **Docker Compose** to orchestrate the application, unit tests (Vitest), and end-to-end tests (Cypress). Below is a guide on how to run the project using Docker.

### 📌 Prerequisites

Ensure you have **Docker** and **Docker Compose** installed on your machine.

- [Download Docker](https://www.docker.com/get-started)
- Verify installation:
  ```sh
  docker -v
  docker-compose -v
  docker-compose up --build

 ### 📌 Dockerfile Breakdown
The Dockerfile sets up the environment to run: 
- ✅ Vue.js application
- ✅ Unit tests with Vitest
- ✅ End-to-End tests with Cypress

