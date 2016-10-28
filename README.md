# Trepo Web Components
> Making genealogy development easier

## About
Trepo Web Components are built using v1 Custom Elements and v1 Shadow Dom. Polyfills are available [here](https://github.com/webcomponents).

**Note**: Components target evergreen browsers and are NOT transpiled to es2015 at this time.

## Usage

1. `npm install tpo`
2. Include `tpo/tpo.js` on your page
    ````html
    <head>
      ...
      <script src="/node_modules/tpo/tpo.js" />
      ...
    </head>
    ````
3. Use tpo components on your page
    ````html
    <body>
      ...
      <tpo-person node="1234" repo="my/repo"></tpo-person>
      ...
    </body>
    ````

## Custom builds

````bash
$ npm install tpo-[whatever]
$ webpack --module-bind 'html=raw' node_modules/tpo-[whatever]/component.js bundle.js
````
