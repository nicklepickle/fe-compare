# Front End Javascipt Library Comparison

## Goal
Implement a small project which demostrates basic setup and usage. Project includes some non-trivial 
requirements including communitaction across components, validation, multiple coalescing API calls, 
client calculations. Front end will consist of three basic components, the main page, an html table
displaying records and a modal dialog to add a record. We will evaluate each library based on the 
following criteria:

- Market Share (use of library, developer availability, age of project)
- Modularity (how much does each component need to know about children, parents?)
- Performance (page load, memory usage, dynamic request speed/size)
- Portability (deviation from web standards, non-portable concepts/syntax)
- Maintainability (lines of code, release stability, number of dependencies, documentation)

## Supporting libraries
We are not evaluating back end technology. The project will use express to implement a REST API and 
simple json files for storage. Vite is used to build and develop. Vite-express is used as glue.

## Notes

### ES6 
- Generating HTML elements comparatively tedious vs. templates
- No data binding
- Great modularity for js, bad modularity for html/css
+ Only vesion to get initial items call correct (all others rely on hard coded 100)
+ Most granular control over data flow
+ Larget market share (it's just javascript!)
+ No dependencies

### React
- Required more packages/dependencies
- Error handling painful at first
- Array maps weak solution for loops
- JSX requires alternate html attributes to avoid naming conflicts with JavaScript keywords
- Needed two components to render records
+ Hooks are improvement over class components
+ Good modularity for html/js, css may leak a little?
+ High market share

### HTMX 
- No data binding
- Examples hard to find online, small market share
- Fall back on js for form validation
- Needed to implement hbs templating library
+ Very terse
+ Unique approach which may be perfect for smaller projects

### Svelte 
- Opinionated about SvelteKit (harded to use without)
- False positive errors in vscode editor (fixable but annoying)
- Component life cycle confusing (when are props populated?)
- Smaller market share
+ :bind makes it very clear which state values can be updated by children
+ Only dev dependencies

### Vue
- v-model a little cryptic
- Needed two components to render records
- Decent market share
- Took longest to implement (ran into issue that stumped me + copilot)
+ Great modularity all around (scoped css could be almost to strict)
+ Only dev dependencies

### Solid
- Needed two components to render records
- Smaller market share
+ By using jsx can piggyback on react market share
+ quickest to implement (copied react templates)
+ Only dev dependencies
+ Good modularity for html/js, css may leak a little? (like react)
+ Unlinke react, JSX does not require alternate html attributes for js keywords
+ For loops is improvement over using map in React