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
We are not evuating back end. The project will use express to implement the API and simple 
json files for storage. Vite is used to build and develop. Vite-express is used to as glue.

### React
- Struggled with coalescing item and category
- Required more packages
- Error handling painful
- Array maps weak solution for loops

### HTMX 
- Server side rendering is cheating (should use templates)
- No data binding
- Fall back on js for form validation

### ES6 
- Generating HTML elements comparatively tedious
- no data binding

### Svelte 
- Hard to use without SvelteKit
