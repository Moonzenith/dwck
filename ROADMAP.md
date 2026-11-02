# dWCk revival roadmap

This backlog describes work observed in the current source, not completed
features or promised delivery dates. Packages below are ordered so each can
produce a reviewable improvement. Hours have not been agreed or measured: the
maintainer should choose the work they actually intend to do and size that
scope before making any time commitment.

## 1. Establish the browser baseline

- [ ] Run every `web-components/index.*.html` demo and record which components
      load, render and respond to their documented events.
- [ ] Reproduce the issues in `web-components/src/TODO.md`: accordion styles
      and event handling, router hidden states and app-layout behavior.
- [ ] Add browser tests for a small supported set: flip card, modal, accordion,
      routing, and one data/event wiring flow. Cover attributes, slots, events
      and connect/disconnect cleanup.
- [ ] Resolve the mixed CommonJS/ES module exports in
      `web-components/src/global/web-tools/index.js` and the misspelled
      `app-authenication` tag, with an explicit compatibility decision.

**Done when:** there is a published demo inventory, failing behaviors have
reproducible issues, and a browser suite exercises the supported components.

## 2. Build a consumable library

- [ ] Separate the library build from the webpack demo app and its HTML plugin.
- [ ] Define ES module and per-component entry points, `exports`, `files`,
      stylesheet handling and `sideEffects` behavior.
- [ ] Load heavy visualization, map, state and data dependencies only where
      needed, and measure the resulting bundles.
- [ ] Audit unused dependencies, including the declared AWS/browser packages.
- [ ] Generate type declarations and a Custom Elements Manifest.
- [ ] Test a packed tarball in a small consumer app without the demo scaffolder.

**Done when:** a clean consumer can import documented components from the
packed package and build them without pulling in the entire demo application.

## 3. Repair the scaffolding CLI

- [ ] Replace the old upstream/development-branch dependency with an explicit
      source strategy for this continuation or its eventual published package.
- [ ] Fix template paths, build command selection and asynchronous error handling
      in `dwck/bin/projectTools.js`.
- [ ] Replace shell interpolation of project names and selectors with argument
      APIs; validate names and refuse existing destination directories.
- [ ] Make `serve` preserve existing files and surface child-process failures.
- [ ] Implement or remove the `element` stub.
- [ ] Test project generation, safe failure, build and local serving in a clean
      temporary directory.

**Done when:** documented CLI commands generate a working project from the
intended source, fail safely and do not destroy an existing `index.html`.

## 4. Modernize checks and dependencies

- [ ] Audit the locked dependency graph and plan compatible upgrades for the
      webpack toolchain and component dependencies.
- [ ] Remove deprecated type stubs already supplied by their libraries.
- [ ] Add a real lint/format command and a CI workflow that runs install, lint,
      build and browser tests.
- [ ] Replace the root Jest scaffold, which currently has no assertions, or
      retire it with the legacy CDK app.
- [ ] Decide which infrastructure experiments belong in the maintained project
      before modernizing TypeScript/CDK and testing deployment behavior.
- [x] Remove the orphaned `dwck-lib` Git submodule entry; maintained source lives
      in `web-components/`.

**Done when:** a pull request has meaningful automated checks and the project
documents its supported Node/browser versions and dependency decisions.

## 5. Document and release the supported scope

- [ ] Bring the original workshop and lesson snippets onto the supported local
      build and CLI; replace the remaining retired CDN examples.
- [ ] Write per-component attribute/event/slot docs and runnable examples.
- [ ] Check keyboard behavior, focus management and ARIA for interactive components.
- [ ] Review licenses and origins of bundled assets and dependencies before release.
- [ ] Choose npm package names, verify ownership/availability, and configure a
      release process; the names in the historical manifests do not prove that
      this continuation can publish to those names.
- [ ] Replace `web-components/deploy-lib-package.sh`, which still invokes the
      nonexistent `deploy:prod` command, with the agreed release procedure.
- [ ] Publish a working demo/docs site after its content and hosting are reviewed.

**Done when:** a new user can follow the documentation, install the intended
release and run the supported examples without a retired AWS deployment.

## Later decisions

- The `p2p` service has a vision document, not an implementation.
- Decide which experimental components remain core and which become separate packages.
- Retire or explicitly scope the `reengage-server.js` authentication experiment;
  it uses fictional data and a dummy token and is not an authentication service.
