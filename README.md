# React Offline Hybrid Boilerplate

> This boilerplate project is based on [https://github.com/chentsulin/electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate).

Hybrid ([Electron](http://electron.atom.io/) + Browser [offline mode]) application boilerplate using:
* [React](https://facebook.github.io/react/)
* [Redux](https://github.com/reactjs/redux)
* [React Router](https://github.com/reactjs/react-router)
* [Webpack 2](http://webpack.github.io/docs/)
* [React Transform HMR](https://github.com/gaearon/react-transform-hmr)
* [PouchDB](https://github.com/pouchdb/pouchdb), "The Database that Syncs!"
* [React Toolbox](http://github.com/react-toolbox/react-toolbox) to provide Material Design Components

Web                        |  Desktop
:-------------------------:|:-------------------------:
![web](https://cloud.githubusercontent.com/assets/394147/22536172/ddd3260c-e8e6-11e6-9704-f913d6e735d1.png)  |  ![desktop](https://cloud.githubusercontent.com/assets/394147/22536165/cfceeec4-e8e6-11e6-8652-bb0dee017841.png)

## Install

* **Note: requires a node version >= 6 and an npm version >= 3.**

First, clone the repo via git:

```bash
git clone https://github.com/juliobetta/react-offline-hybrid-boilerplate.git your-project-name
```

And then install dependencies.

```bash
$ cd your-project-name && npm install
```


## Run & Generate

**Desktop in development mode**

    npm run dev-desktop

**Web in development mode**

    npm run dev-web

... and access http://localhost:8080

**Build Web package**

    npm run build-web

The files will be located in the folder `build`.


**Generate Desktop package**

*OSX*

    npm run package

*Linux*

    npm run package:linux

*Windows*

    npm run package:win

*All platforms at once*

    npm run package:all

The files will be located at `release/[platform]`.

Before building for multiple platforms, please refer to  [https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build).

## Tests

The project is covered by tests using Chai.

To run them once, execute:

    npm run test:all

... or in watch mode:

    npm run test:watch

You can run tests in isolation by using wildcards or even a path to a single file.

*Wildcard*

    npm run test path/to/test/**/*.test.js


*Single file*

    npm run test path/to/file.test.js


To run in watch mode, add `-- --watch` in front of the commands above.


Please, make sure to take a look at all available npm commands in `package.json`.

## Editor Configuration
**Atom**
```bash
apm install editorconfig es6-javascript autocomplete-flow javascript-snippets linter linter-eslint language-babel
```

**Sublime**
* https://github.com/sindresorhus/editorconfig-sublime#readme
* https://github.com/SublimeLinter/SublimeLinter3
* https://github.com/roadhump/SublimeLinter-eslint
* https://github.com/babel/babel-sublime

**Others**
* [Editorconfig](http://editorconfig.org/#download)
* [ESLint](http://eslint.org/docs/user-guide/integrations#editors)
* Babel Syntax Plugin


## Troubleshooting

*Tested on macOS*

In case the terminal gets stuck on `npm install`, hit `ctrl+C` and run the following commands:

    node_modules/.bin/electron-rebuild

...and then

    bash postinstall.sh
