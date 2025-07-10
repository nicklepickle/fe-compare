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

## Comparison Candidates
- ES6 (no dependencies)
- HTMX
- React
- Solid
- Svelte
- Vue

## Key Differences
- Vue and React use a virtual DOM while Svelte and Solid do not use a virtual DOM.
- Svelte and Vue use HTML-first templating.
- JSX used by React and Solid is a JavaScript-first templating language.
- Svelte and Vue can scope css to a component while css included by JSX components is global.
- HTMX relies on server side templating (i.e. express hbs) and is *mostly* a pure HTML solution.
- ES6 uses no templating or framework and is a pure javascript solution provided as a baseline.

## Comparison Criteria
The various libraries will be avaulated on the following criteria:
- Market share
- Amount of dependencies
- Developer experience
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
#### Pros
+ Does not require learning a framework
+ Most granular control over data flow and lifecycle
+ Great modularity for JS modules
#### Cons
- Generating HTML elements tedious without templates
- No data binding
- No modularity for HTML/CSS

### HTMX 
#### Pros
+ Very intutive data flow
+ Small set of html extenstions to learn
+ Easy to extend with standard JS
#### Cons
- No data binding
- Relied on/limited by hbs templating library for server side rendering
- Lack of support for loading HTMX as a ES6 module
- No modularity for CSS

### React
#### Pros
+ Hooks are an improvement over class components
+ Good modularity for HTML/JS
+ Wide array of developer tools available
#### Cons
- Error handling painful wihtout error boundy
- Array map weak solution for loops
- JSX requires alternate html attributes to avoid naming conflicts with JS keywords
- CSS modularity lost during build

### Solid
#### Pros
+ Good modularity for HTML/JS
+ Unlinke react, JSX does not require alternate html attributes for JS keywords
+ For loops are an improvement over using array map in React
#### Cons
- CSS modularity lost during build

### Svelte
#### Pros
+ Good modularity for HTML/JS
+ CSS modulatiry enforced at build
+ More standard way of including js, css and html in a component than JSX
+ :bind makes two-way binding easy (maybe too easy?)
#### Cons
- Struggled with initial setup without SvelteKit (skill issue)
- False positive errors in VSCode editor (fixable but annoying)
- Component life cycle confusing (when are props populated? skill issue)

### Vue
#### Pros
+ Good modularity for HTML/JS
+ CSS modulatiry enforced at build
+ More standard way of including js, css and html in a component that JSX
#### Cons
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
dist/assets/index-D1Xc-jUN.js   194.72 kB │ gzip: 61.28 kB
✓ built in 441ms
```
Total Uncompressed: 196.84 kB

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


## Run time performance (Mac OS + Safari 18.3.1)

### ES6
- 100 Records: Total payload: 41.1 KB | Load time: 40.6 MS
- 1000 Records: Total payload: 99.5 KB | Load time: 63.1 MS
- 2000 Records: Total payload: 165.1 KB | Load time: 68.1 MS

### HTMX 
- 100 Records: Total payload: 101.1 KB | Load time: 66.2 MS
- 1000 Records: Total payload: 323.2 KB | Load time: 51.6 MS
- 2000 Records: Total payload: 573.1 KB | Load time: 79.9 MS

### React
- 100 Records: Total payload: 228.6 KB | Load time: 54.3 MS
- 1000 Records: Total payload: 286.9 KB | Load time: 44.3 MS
- 2000 Records: Total payload: 352.5 KB | Load time: 63.9 MS

### Solid 
- 100 Records: Total payload: 50.7 KB | Load time: 58.2 MS
- 1000 Records: Total payload: 109.9 KB | Load time: 66.2 MS
- 2000 Records: Total payload: 174.9 KB | Load time: 52.3 MS

### Svelte
- 100 Records: Total payload: 61.0 KB | Load time: 48.8 MS
- 1000 Records: Total payload: 119.3 KB | Load time: 66.1 MS
- 2000 Records: Total payload: 184.9 KB | Load time: 56.0 MS

### Vue
- 100 Records: Total payload: 101.7 KB | Load time: 55.0 MS
- 1000 Records: Total payload: 160.0 KB | Load time: 75.4 MS
- 2000 Records: Total payload: 225.6 KB | Load time: 90.6 MS

## Run time performance (Windows 11 + Chrome 138.0.7204.97)

### ES6
- 100 Records: Memory: 9.0 MB | Resources: 41.4 KB | Load: 285 MS
- 1000 Records: Memory: 50.1 MB | Resources: 99.7 KB | Load: 576 MS
- 2000 Records: Memory: 88.5 MB | Resources: 165 KB | Load: 2130 MS

### HTMX
- 100 Records: Memory: 13.5 MB | Resources: 102 KB | Load: 1530 MS
- 1000 Records: Memory: 77.6 MB | Resources: 329 KB | Load: 2290 MS
- 2000 Records: Memory: 63.2 MB | Resources: 583 KB | Load: 1830 MS

### React
- 100 Records: Memory: 25.7 MB | Resources: 229 KB | Load: 1730 MS
- 1000 Records: Memory: 51.1 MB | Resources: 287 KB | Load: 1820 MS
- 2000 Records: Memory: 75.4 MB | Resources: 353 KB | Load: 1320 MS

### Solid
- 100 Records: Memory: 17.8 MB | Resources: 50.8 KB | Load: 996 MS
- 1000 Records: Memory: 52.3 MB | Resources: 109 KB | Load: 1200 MS
- 2000 Records: Memory: 91.1 MB | Resources: 175 KB | Load: 1690 MS

### Svelte
- 100 Records: Memory: 13.5 MB | Resources: 61.1 KB | Load: 983 MS
- 1000 Records: Memory: 53.7 MB | Resources: 119 KB | Load: 1090 MS
- 2000 Records: Memory: 126 MB | Resources: 185 KB | Load: 1180 MS

### Vue
- 100 Records: Memory: 16.7 MB | Resources: 102 KB | Load: 983 MS
- 1000 Records: Memory: 59.9 MB | Resources: 160 KB | Load: 1340 MS
- 2000 Records: Memory: 158 MB | Resources: 226 KB | Load: 1930 MS

## Takeaways

### Market share
If market share and all of the benefits that go with it (community, developers, compatible 
packages, tutorials and lets be honest in 2025 GPT, Copilot, Cursor prompting) then React
is the clear winner here. By any of the metrics considered and I am certian many that
were not, React has more market share than all of the other candidates combined. React
is the oldest of these technologies and will likely stick around far into the future. HTMX
and Solid are about tied for the lowest market share and are the newest options. Solid has
the benefit of using JSX which I would imagine makes it easier to adopt if you and your
team are already familiar with React.

### Dependencies
While React is the clear winner when it comes to market share it is on the bottom wrung
if your main concern is minimizing dependencies. React has an abundance of compatible 
packages and it all but forces you to use some of them. This is a clear trade off from
my perspective. More compatible packages means more functionality that you don't have
to write yourself but also means a more complex dependency graph and a larger build size.
In contrast Svelte (true to its name) has an impressivley small node_modules directory 
and dependency list in general. Solid also gets a nod here. HTMX has deceptively
minimal dependencies because it offloads all dynamic rendering to the server. If you
are already using SSR with e.g. PHP, cshtml, jsp, etc. then this is a non-issue but if
you need to evaluate SSR solutions then this could add a fairly significant dependency.

### Developer experience

#### Previously on...
DX is obviously a very subjective topic and depends greatly on prior experience. To take
a small bio detour, I've spent the majority of my career as a back end dev. My experience
with front end was heavy during the jQuery and then Angular years. I did use an earlier
version of React during the class component era so JSX was not a new concept. Most of
the projects I maintain professionally have been migrating off of jQuery towards standard
ES6 replacing jQuery with fetch and querySelector. Angular was abandoned when it moved 
to TypeScript. We have an appitite to use a more modern approach and here we are.

#### Developer methodology
My methodology during development of these test projects was to start each project using
vite create, try to implement the requirements using the official docs, rely on tutorials
when I had questions and then falling back on Copilot when all else failed. Once the 
projects were created, tested and working, I took a second pass to improve consistency.
My goal was not perfection but rather an application that deomstrated more real world
complexity than a counter or todo list.

#### React vs. Solid
React's move from class components to hooks definitely makes it a lot more dev friendly.
I am still unsure when to useEffect and when it is unnecessary. I wanted to stick with
fetch for API calls for consitency but saw many suggestions to use react-query at the 
cost of yet another dependency. This is my main critique of React. It seems to force
you into the React ecosystem making the standard JS API feel like a second class citizen.
In contrast Solid allowed a more standard approach to writing JSX and components in 
general. I really appreciate that Solid does not complain about JS keywords in JSX. It 
makes migration much easier. I also appreciate the control flow elements which can be
a bit more intuitive than using JS primitives in React JSX. I initially expected 
Solid would offer less features than React but was pleased to see it does support complex
features beyond what I could demonstrate in these test projects e.g. suspense rendering 
and SSR.

#### Svelte
Prior to this project I had no direct experience with Svelte or Vue. They were both
approachable by virtue of their HTML first design. State handling with runes in Svelte
feels very similar to React hooks. The key difference is that $state does not return
a setter. Instead, Svelte offers the $bindable rune for two way data flow. In some ways 
$bindable is simpler than passing setters around as props. Svelte seems to discourage
it's use claiming "This isn’t something you should do often". My experience is this is
something I do often and I could see the temptation to make everything bindable leading
to a jQuery like situation where it is difficult to reason about who updates what. 

#### Vue
I did struggle with Vue state more than state in the other projects. This was largely a 
skill issue and turned out to be much simpler than I initially thought. Some of this had 
to do with the fact that there are multiple ways to handle state in Vue (data vs. ref vs.
Vuex). At one point I fed most of my Vue files to Copilot to figure it out and it
produced a completely broken solution. My main critique of Vue is that it seems there
has been a decent amount of churn in the API. After my successful implementation, I 
laerned I probably should have been using Pinia for state all along. This isn't uncommon
in any library that has been around for a while and Vue is over ten years old. React
suffers from some of the same issues and I do appreciate backwards compatibility so 
c'est la vie.

#### HTMX
HTMX is definitely the odd man out. In some ways it is comparing apples to bicycles 
when set along side the other libraries. HTMX relies entirely on server side rendering
so there is no templating here. I was surprised how much milage I got out of the hx- 
attributes. Form validation and cookie access were the only features which required
writing javascript and even there I was able to take advantage of the htmx JS functions
to do a lot of useful things. State is entirely managed on the server due to SSR which
isn't necessarily a bad thing and certianly better than having a large SQL data set
that must be synced with a mirror of that data on the client. I do believe that a large
and complex enough application would eventually devolve into a jQuery like mess using
only HTMX. My largest HTMX critique though is the lack of support for loading as an ES6 
modules. In 2025 modules should be the default and I want to `import htmx from 'htmx.min.js'` 
which as far as I can tell is not possible.

#### CSS
The style requirements for the test projects were fairly simple. The only dynamic
css was toggling the display of the add item modal and toggling a dark mode theme. I was
a little disapointed that in almost all of the solutions the main app had to know to
remove the .hidden class to show the modal. If that css class is defined in the 
componentm I need to know more about its implementation than it seems I should as a parent. 
Toggling dark mode was largely trivial due to the fairly new color-scheme property. One
key difference between how Svelte and Vue handle component css vs JSX is that css can
be scoped entirely to the component e.g. `h2 {color:purple}` would only style h2's
within the component where the css was included while in JSX any component css is global.

#### Vite

The unsung hero in this project as a whole is Vite. Vite provided a fantastic starting 
point for all of the libraries, user friendly dev and build tools and a simple integration
with the purposefully basic express back end. I doubt I would have had the patience to 
complete this without it. Shout out to Vite!

### Build size
As you would expect build size tracks with dependency count. More dependencies mean
bigger build. The winners here are Solid and Svelte with Solid beating Svelte by 11 KB.
The heaviest build was React coming in at over ten times the size of Solid. How much
this matters depends heavily on the size and complexity of the application as well as
the target audience. That said most public facing web apps will target mobile users
pulling your app down over a cellular network where they could be running as slow as
300-400 kbps over 3G.

### Run time performance
All of the performance benchmarks were measured with a production build using preview
with only one browser tab open and some attempt to minimize other processes. With an 
application the size and complexity of the test project, all of the projects performed 
well enough that any discrepencies in load time or memory useage are likely due to the 
environment they were running in rather than the speed of the build even with records 
cranked to 2000. If there is any takeaway here it is that my Windows 11 work laptop 
running Chrome performed radically worse than my M1 2021 iMac running Safari.

## What about...
 
### Angular?
Angular is now a TypeScript library which you can not use with pure JS. This is a JS
library comparison. It is disqualified. I also have opinions from prior experience.
But hey, try it out. Vite create an angular app and see for yourself. Not pretty.

### Server components?
This is a valid question because every library evaluated here has some sort of SSR
companion. React has Next.js, Solid has solid-start, Svelte has SvelteKit, Vue has
vue/server-renderer. All of these assume you want to run JavaScript on your back end.
Do you want to run a JS back end? My perfessional opinion is unless it is a small
project that is not public facing, no you mostly don't. JS eats memory like me at
a BBQ. It is slower than compiled languages and it is hard to reason about what it's
doing under the hood thus hard to optimize. My current job runs C# and SQL Server.
If I was starting a new project in 2025 I would consider Go. The reason HTMX snuck 
in there because it is back end agnostic but it isn't really doing components either.

