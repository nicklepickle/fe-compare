# Front End Comparison Results

## Build

### ES6
> es6-test@1.0.0 build
> vite build

vite v6.3.5 building for production...
✓ 7 modules transformed.
dist/index.html                 2.61 kB │ gzip: 0.75 kB
dist/assets/index-J-7tryoT.css  1.75 kB │ gzip: 0.68 kB
dist/assets/index-CMAPaDZy.js   5.07 kB │ gzip: 1.87 kB
✓ built in 374ms

### HTMX
> htmx-test@1.0.0 build
> vite build

vite v6.3.5 building for production...
htmx.min.js can't be bundled without type="module" attribute (48.1 kB)
✓ 2 modules transformed.
dist/index.html                 5.28 kB │ gzip: 1.91 kB
dist/assets/index-BX9qL0Ht.css  1.73 kB │ gzip: 0.67 kB
✓ built in 41ms

## React
> react-test@0.0.0 build
> vite build

vite v6.3.5 building for production...
✓ 36 modules transformed.
dist/index.html                   0.37 kB │ gzip:  0.26 kB
dist/assets/index-x91orODR.css    1.75 kB │ gzip:  0.68 kB
dist/assets/index-D1Xc-jUN.js   194.63 kB │ gzip: 61.28 kB
✓ built in 436ms

## Solid
> solid@0.0.0 build
> vite build

vite v6.3.5 building for production...
✓ 13 modules transformed.
dist/index.html                  0.46 kB │ gzip: 0.29 kB
dist/assets/index-x91orODR.css   1.75 kB │ gzip: 0.68 kB
dist/assets/index-DXVV_tn8.js   16.75 kB │ gzip: 6.66 kB
✓ built in 190ms