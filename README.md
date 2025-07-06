# Front End Javascipt Library Comparison

## About
This project is a comparison of front end javascript libraries. Libraries will be compared using a 
small test project with requirements detailed in requirements.html. The purpose of this project is
to evaluate common front end challanges including cross component data binding, form validation, 
coalescing data from API calls, client side calculations and css theme support. 

## Supporting Libraries
This project is not evaluating back end technology. It will use express to implement a REST API and 
simple json files for storage. Vite is used to build and develop. Vite-express is used as glue.
Implementations were all created by running `npm create vite@latest` and following the prompts.

## Comparison Criteria
The various libraries will be avaulated on the following criteria:
- Market share
- Developer experience
- Amount and type of dependencies
- Build size
- Run time performance

## Market Share (June 2025)

### NPM Weekly Downloads
- [HTMX](https://www.npmjs.com/package/htmx.org) 81,792
- [React](https://www.npmjs.com/package/react) 47,014,991
- [Solid](https://www.npmjs.com/package/solid-js) 656,199
- [Svelte](https://www.npmjs.com/package/svelte) 1,942,000
- [Vue](https://www.npmjs.com/package/vue) 7,480,888

### GitHub Stars
- [HTMX](https://github.com/bigskysoftware/htmx) 45.2k
- [React](https://github.com/facebook/react) 237k
- [Solid](https://github.com/solidjs/solid) 33.9k
- [Svelte](https://github.com/sveltejs/svelte) 83.3k
- [Vue](https://github.com/vuejs/core) 50.7k

### [Stack Overflow Questions by Tag](https://stackoverflow.com/tags)
- HTMX 609 
- React 481,128
- Solid 324
- Svelte 6359
- Vue 108,683

### [Stack Overflow 2024 Survey](https://survey.stackoverflow.co/2024/technology#admired-and-desired)
- HTMX 9.3% Desired / 72.9% Admired
- React 33.4% Desired / 62.2% Admired
- Solid 3.6% Desired / 67% Admired
- Svelte 11.5% Desired / 72.8% Admired
- Vue 16.3% Desired / 60.2% Admired

### [State of JS 2024 Usage](https://2024.stateofjs.com/en-US/libraries/front-end-frameworks)
- HTMX 7%
- React 82%
- Solid 9%
- Svelte 26%
- Vue 51%

### Release Year
- HTMX 2020
- React 2013
- Solid 2021
- Svelte 2016
- Vue 2014

## Dependencies

### ES6
Prod
- express
Dev
- vite
- vite-express

total dependencies: 3
package-lock size: 62 kB
node_modules size: 22.1 MB

### HTMX
Prod
- express
- hbs
- htmx.org
Dev
- vite
- vite-express

total dependencies: 5
package-lock size: 67 kB
node_modules size: 22.4 MB

### React
Prod
- express
- react
- react-dom
- react-error-boundary
Dev
- @types/react
- @types/react-dom
- @vitejs/plugin-react
- globals
- vite
- vite-express

total dependencies: 10
package-lock size: 93 kB
node_modules size: 44.8 MB

### Solid
Prod
- express
- solid-js
Dev
- vite
- vite-express
- vite-plugin-solid

total dependencies: 5
package-lock size: 94 kB
node_modules size: 38.7 MB

### Svelte
Prod
- svelte
- express
Dev
- @sveltejs/vite-plugin-svelte
- vite-express
- vite

total dependencies: 5
package-lock size: 76 kB
node_modules size: 27.7 MB

### Vue
Prod
- express
- vue
Dev
- @vitejs/plugin-vue
- vite-express
- vite

total dependencies: 5
package-lock size: 72 kB
node_modules size: 38.5 MB

## Development

### ES6
Pros
+ Does not require learning a framework
+ Most granular control over data flow and lifecycle
+ Great modularity for JS modules
Cons
- Generating HTML elements tedious without templates
- No data binding
- No modularity for HTML/CSS

### HTMX 
Pros
+ Very intutive data flow
+ Small set of html extenstions to learn
+ Easy to extend with standard JS
Cons
- No data binding
- Relied on/limited by hbs templating library for server side rendering
- Lack of support for loading HTMX as a ES6 module
- No modularity for CSS

### React
Pros
+ Hooks are an improvement over class components
+ Good modularity for HTML/JS
+ Wide array of developer tools available
Cons
- Error handling painful wihtout error boundy
- Array map weak solution for loops
- JSX requires alternate html attributes to avoid naming conflicts with JS keywords
- CSS modularity lost during build

### Solid
Pros
+ Good modularity for HTML/JS
+ Unlinke react, JSX does not require alternate html attributes for JS keywords
+ For loops are an improvement over using array map in React
Cons
- CSS modularity lost during build

### Svelte
Pros
+ Good modularity for HTML/JS
+ CSS modulatiry enforced at build
+ More standard way of including js, css and html in a component than JSX
+ :bind makes two-way binding easy (maybe too easy?)
Cons
- Struggled with initial setup without SvelteKit (skill issue)
- False positive errors in VSCode editor (fixable but annoying)
- Component life cycle confusing (when are props populated? skill issue)

### Vue
Pros
+ Good modularity for HTML/JS
+ CSS modulatiry enforced at build
+ More standard way of including js, css and html in a component that JSX
Cons
- v-model a little cryptic
- Took longest to implement (skill issue)

## Build

### ES6
```
> es6-test@1.0.0 build
> vite build

vite v6.3.5 building for production...
✓ 7 modules transformed.
dist/index.html                 2.61 kB │ gzip: 0.75 kB
dist/assets/index-J-7tryoT.css  1.75 kB │ gzip: 0.68 kB
dist/assets/index-qzgQcJRy.js   5.07 kB │ gzip: 1.87 kB
✓ built in 184ms
```
Total Uncompressed: 9.43 kB


### HTMX
```
> htmx-test@1.0.0 build
> vite build

vite v6.3.5 building for production...
htmx.min.js can't be bundled without type="module" attribute (48.1 kB)
✓ 2 modules transformed.
dist/index.html                 5.28 kB │ gzip: 1.91 kB
dist/assets/index-J-7tryoT.css  1.75 kB │ gzip: 0.68 kB
✓ built in 157ms
```
Total Uncompressed: 55.13 kB

### React
```
> react-test@0.0.0 build
> vite build

vite v6.3.5 building for production...
✓ 36 modules transformed.
dist/index.html                   0.37 kB │ gzip:  0.26 kB
dist/assets/index-x91orODR.css    1.75 kB │ gzip:  0.68 kB
dist/assets/index-D1Xc-jUN.js   194.63 kB │ gzip: 61.28 kB
✓ built in 436ms
```
Total Uncompressed: 196.75 kB

### Solid
```
> solid-test@0.0.0 build
> vite build

vite v6.3.5 building for production...
✓ 13 modules transformed.
dist/index.html                  0.46 kB │ gzip: 0.29 kB
dist/assets/index-x91orODR.css   1.75 kB │ gzip: 0.68 kB
dist/assets/index-DXVV_tn8.js   16.75 kB │ gzip: 6.66 kB
✓ built in 190ms
```
Total Uncompressed: 18.96 kB

### Svelte
```
> svelte-test@0.0.0 build
> vite build

vite v6.3.5 building for production...
✓ 101 modules transformed.
dist/index.html                  0.40 kB │ gzip:  0.27 kB
dist/assets/index-N8SxIneX.css   2.19 kB │ gzip:  0.74 kB
dist/assets/index-DQ5tZtIL.js   26.66 kB │ gzip: 10.53 kB
✓ built in 289ms
```
Total Uncompressed: 29.25 kB

### Vue
```
> vue-test@0.0.0 build
> vite build

vite v6.3.5 building for production...
✓ 18 modules transformed.
dist/index.html                  0.39 kB │ gzip:  0.27 kB
dist/assets/index-CtDfmxcm.css   2.20 kB │ gzip:  0.75 kB
dist/assets/index-DxMo-c_l.js   67.36 kB │ gzip: 26.61 kB
✓ built in 359ms
```
Total Uncompressed: 69.95 kB


## Run time performance

### ES6 (Safari 18.3.1)
- 20 Records: Total payload: 36.1 KB | Load time: 29.3 MS
- 100 Records: Total payload: 41.1 KB | Load time: 40.6 MS
- 1000 Records: Total payload: 99.5 KB | Load time: 63.1 MS
- 2000 Records: Total payload: 165.1 KB | Load time: 68.1 MS

### HTMX (Safari 18.3.1)
- 20 Records: Total payload: 81.1 KB | Load time: 49.5 MS
- 100 Records: Total payload: 101.1 KB | Load time: 66.2 MS
- 1000 Records: Total payload: 323.2 KB | Load time: 51.6 MS
- 2000 Records: Total payload: 573.1 KB | Load time: 79.9 MS