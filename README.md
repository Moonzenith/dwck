# Devarchy Web Components Kit (dWCk)

An opinionated set of native Web Components for building web apps declaratively: you compose behavior in HTML, wire elements together with attributes, and write JavaScript only where you need it. No framework, no virtual DOM, just custom elements, Shadow DOM and slots.

> **Status: being revived.** The project was dormant for a while and is being brought back to a working, publishable state. A clean install and production build work today (see [Quick start](#quick-start)), but most components have not yet been re-verified in a browser, there are no automated tests, and nothing is published under this repo's name yet. The [roadmap](#roadmap) below is the plan to fix that.

## Origin

dWCk started as a pet project by Diego Torres, written while at Amazon as an open-source side project. This repository continues that work, with the packaging, fixes and canonical folder structure added on top. Authorship is spread across several contributors and the git history is messy (many merges and force-moves between repos), so `git log` understates how much has changed. See [Credits](#credits).

## The idea

Components talk to each other through DOM events, and you connect them with attributes instead of glue code:

```html
<flip-card style="width: 500px;" disabled>
  <h1 slot="front">front</h1>
  <section slot="back"><h1>💰</h1></section>
</flip-card>

<button id="open-counter-modal">open</button>

<app-modal id="counter-modal" trigger="#open-counter-modal">
  <h1 slot="title">New counter</h1>
  <section slot="main">
    <input type="text" name="name" />
  </section>
</app-modal>
```

`trigger="<css selector>"` says *what* to listen to; `on` / `event` says *which event*. The same convention drives the data, event-stream and state-machine elements, which is what makes the kit "opinionated": once you know it, every component is wired the same way.

## What's inside

All source lives in [web-components/src](web-components/src).

| Area | Tags | Notes |
| --- | --- | --- |
| **UI components** | `flip-card`, `app-modal`, `app-accordion`, `plain-card`, `simple-card`, `header-card`, `testimonial-card`, `pop-over-menu`, `deck-reader`, `code-editor` | Leaf building blocks |
| **Drag & drop** | `drag-area`, `draggable-item`, `drop-area` | |
| **Data viz & maps** | `data-chart`, `graph-viewer`, `data-graph`, `geo-map` | Wrap Chart.js, Cytoscape, vis-network and MapLibre GL |
| **Layouts** | `app-layout`, `mobile-layout`, `shortcut-panel`, `app-router` + `app-route`, `landing-page` and its `landing-*` parts | |
| **Data** | `data-store`, `data-set`, `data-point`, `data-query`, `data-sync`, `ui-data-repeat`, `ui-data-sync`, `ui-dataset-sync` | Backed by Dexie (IndexedDB) and localForage |
| **Events** | `event-stream`, `event-group`, `event-source` | Declarative event plumbing |
| **State** | `state-machine`, `machine-state`, `machine-transition` | Built on XState |
| **Runtime** | `js-fn`, `web-worker`, `service-worker`, `service-worker-cache`, `device-acceleration`, `app-authenication` | |
| **Helpers** | `html`, `select`, `selectAll`, `updateVars`, `registerTriggers`, `mapComponentEvents`, `renderForLoops`, `gql`, ... | Shared in [src/global/web-tools](web-components/src/global/web-tools) |

Planned but only sketched (a `vision.html`, no implementation): `p2p`.

Themes are plain CSS files in [src/global/themes](web-components/src/global/themes) (mono, night, swamp, light, dark, plus AWS and United variants). The bundle currently imports `theme-mono`.

## Quick start

Requires Node.js and npm. This was verified on Node 24 / npm 11.

```sh
git clone <this-repo-url>
cd web-components-repository/web-components
npm install
```

The webpack config renders one of the demo pages, chosen by the `DWCK_APP_NAME` environment variable (it loads `index.<name>.html`):

```sh
# dev server with the workshop demo page
DWCK_APP_NAME=workshop npm run serve

# production build into web-components/dist
DWCK_APP_NAME=workshop npm run build:prod
```

Other demo pages live next to it: `index.chart.html`, `index.graph.html`, `index.layout.html`, `index.router.html`, `index.state-machine.html`, `index.game.html`, and more. Many are experiments from earlier work and may be broken.

## Repository layout

```
web-components/        The component library (package name: dwck-lib) and demo pages
  src/components/        UI components
  src/layouts/           App, mobile, landing, router and shortcut-panel layouts
  src/services/          Data, events, state machine, workers, auth, device
  src/global/            web-tools helpers and CSS themes
  assets/configs/        Templates used by the project scaffolder
dwck/                  `dwck` CLI that scaffolds a starter project
docs/                  Workshop and lessons (Markdown + screenshots)
lib/, bin/, infra/,    AWS CDK app that deployed the demo site/CDN, plus Lambda code.
lambda/, test/, cdk.json   Not part of the library; see roadmap
```

## Scaffolding CLI

`dwck/` contains a small Commander-based CLI:

```sh
dwck project <name>      # create a starter project
dwck serve <name>        # symlink index.<name>.html to index.html and serve it
dwck element <name>      # stub: parses options but doesn't create anything yet
```

Heads up: `dwck project` currently sparse-clones from the **original upstream repository's** `development` branch (see `REPO_URL` in [dwck/bin/projectTools.js](dwck/bin/projectTools.js)), so it doesn't pick up anything from this repo until that is repointed.

## Learning material

[docs/workshop.md](docs/workshop.md) is a hands-on workshop, "Reimagining the web with native Web Components":

- [Lesson 1](docs/lesson-1/lesson-1.md): using components, then writing your own (`secret-card`)
- [Lesson 2](docs/lesson-2/lesson-2.md): data, events and routing

## Roadmap

The goal: anyone can `npm install` the kit, drop a component into an HTML page, and trust that it works. Phases are ordered, and each one leaves the project in a better state than the last. The findings below come from a fresh install, a production build, and a read through the source.

### Phase 0: Take ownership of the repo
- [ ] Publish to your GitHub account and update `origin` (it still points at the upstream repo)
- [ ] Decide the layout: library and CLI as packages, CDK stuff either moved under `infra/` or dropped. Root `package.json` is currently the CDK app (`20-web-components-repository`, TypeScript 3.9, aws-cdk 2.38.1, Jest 27), which is the wrong thing to be at the top of a component library
- [ ] Repair or remove `dwck-lib`: it is committed as a git submodule pointer (mode `160000`) but there is no `.gitmodules`, so it is an empty, unusable directory
- [ ] Delete files that should never have been committed: `web-components/libwidevinecdm.so` and its `.zip`, `.DS_Store`, `.$random-arch.bkp`, `random-arch`, `design-tokens-DELETE-ME.html`, `src/global/web-tools-DELETE_IF_TEST_OK.js`, `*.rpdk.log`
- [x] Add a `LICENSE` file (MIT) and align the `license` field in the package manifests
- [ ] Update the `author` fields in `web-components/package.json` (still only Diego Torres)
- [ ] Ask Diego Torres to confirm the move from ISC to MIT, and note the other contributors' copyright in the history (see [License](#license))
- [ ] Remove the stale CloudFront ID/bucket details in `web-cdn.json` and `dt-cdk-lib.json`

### Phase 1: Get a trustworthy baseline
Already confirmed: `npm ci` succeeds and the production build compiles (with 5 size warnings).
- [ ] Open every `index.*.html` demo and record in an issue which work and which are broken
- [ ] Fix the known problems in [src/TODO.md](web-components/src/TODO.md): accordion styles, accordion should emit an event and be openable from JS/attribute, `app-router` hidden-state styling bug, `app-layout` not working
- [ ] Fix `src/global/web-tools/index.js`, which uses CommonJS `module.exports` while everything else uses ES modules
- [ ] Fix the `app-authenication` tag typo (breaking change, so do it before the first release)
- [ ] Standardize the wiring attributes: docs and demos use both `on="click"` and `event="accepted"` for the same job

### Phase 2: Turn the app bundle into a real library build
Today `webpack.config.js` is an *app* bundler: it needs `DWCK_APP_NAME` and emits a single 2.5 MiB `dWCk.js` that bundles every component and every dependency.
- [ ] Separate the **library build** (ES module output, no `HtmlWebpackPlugin`) from the **demo/dev server**
- [ ] Ship per-component entry points (`dwck/flip-card`, ...) so consumers only pay for what they import
- [ ] Make heavy dependencies optional or lazy (`import()`): Chart.js, Cytoscape (+ cxtmenu, klay), vis-network, MapLibre GL, XState, Dexie
- [ ] Stop inlining the 2.6 MB `testimonial-img-1.png` into the bundle
- [ ] Audit dependencies: `aws-amplify`, `@aws-sdk/client-dynamodb`, `aws-crt` and `ace-builds` are declared but I found no static import of them in `src/`; drop whatever is unused
- [ ] Fix `deploy-lib-package.sh`, which calls an `npm run deploy:prod` script that doesn't exist

### Phase 3: Modernize
- [ ] Bump webpack and its loaders, the Chart.js / Cytoscape / MapLibre / XState majors, and the root TypeScript, Jest and aws-cdk (all from 2022-era versions); run `npm audit` and resolve what it finds
- [ ] Replace deprecated `@types/dexie` / `@types/maplibre-gl` stubs with the types the libraries now ship
- [ ] Emit type declarations (from JSDoc, since `jsdoc.json` already exists) and a Custom Elements Manifest for editor autocomplete

### Phase 4: Tests and CI
Right now there are none that matter: `web-components` has `echo "no test specified"`, and the only Jest test is the untouched CDK scaffold.
- [ ] Add component tests that run in a real browser engine (Web Test Runner or Playwright) covering render, attributes, slots, events and `trigger`/`on` wiring
- [ ] Add a GitHub Actions workflow: install, lint (Prettier config already exists), build, test on every PR
- [ ] Delete or replace `test/20-web-components-repository.test.ts`

### Phase 5: Docs and demo site
- [ ] Rewrite [web-components/README.md](web-components/README.md): it lists the same `flip-card` link five times, points at nonexistent READMEs, and its CDN snippet uses a CloudFront domain that did not resolve when I tried it
- [ ] Fill in per-component docs. Several readmes are empty headings (e.g. `modal/readme.md`)
- [ ] Update the workshop to the new scaffolder. `docs/workshop.md` currently says the script may be broken and points at a different template repo
- [ ] Publish a demo and docs site on GitHub Pages (this is already the open item in [docs/todo.md](docs/todo.md))

### Phase 6: Distribution
- [ ] Pick package names. **`dwck` and `dwck-lib` already exist on npm under another account**, so you will need new names, ideally scoped (e.g. `@your-scope/dwck`)
- [ ] Repoint the `dwck` CLI at this repo (or, better, at the published package) instead of cloning a branch
- [ ] Configure `files`, `exports`, `sideEffects` and versioning; publish from CI with provenance
- [ ] Once on npm, document the jsDelivr / unpkg URLs as the CDN replacement for the dead CloudFront links

### Later
- [ ] Implement `p2p` (only a vision sketch exists) and `dwck element` (currently a stub)
- [ ] Accessibility pass on every interactive component (focus management in `app-modal`, keyboard support in `app-accordion` and `pop-over-menu`, ARIA roles)
- [ ] Decide which of the experimental pieces (`deck-reader`, `geo-map`, `shortcut-panel`, the `extra/extension-bar`) are core and which move to a separate package

## Credits

- **Diego Torres**: original author and creator of the kit
- **Alejandro Quiroz (Moonzenith)**: packaging, fixes, canonical folder structure, the `dwck` CLI, and the revival
- Contributors in the history: Marco Del Boccio, Conor Casey, and others

## License

[MIT](LICENSE). The code was previously declared ISC in `package.json`; the two licenses grant the same permissions.
