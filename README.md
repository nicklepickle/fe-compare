# Front End Javascipt Library Comparison

## Goal
Implement a small project which demostrates basic setup and usage. Project includes some non-trivial 
requirements including communitaction across components, validation, multiple coalescing API calls, 
client calculations. Front end will consist of three basic components, the main page, an html table
displaying records and a modal dialog to add a record. We will evaluate libraries based on the 
following criteria:

- Market Share (use of library, developer availability, age of project)
- Performance (page load, memory usage, dynamic request speed/size)
- Portability (deviation from web standards, non-portable concepts/syntax)
- Maintainability (lines of code, release stability, number of dependencies, documentation)

## Potential candidates
- React
- HTMX
- Svelte
- Vue
- ES6

## Supporting libraries
We are not evuating back end. The project will use express to implement API and storate as 
simple json files. Vite is used to build and develop. vite-express is used to as glue.

## Notes
- React - Struggled with coalescing item and category, required more packages, error handling painful
- HTMX - Server side rendering is cheating a little, no data binding, falling back on js for form validation
- ES6 - Generating HTML elements comparatively tedious, no data binding
- Svelte - Hard to use without SvelteKit
