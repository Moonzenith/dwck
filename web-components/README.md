# dWCk component package

This folder contains the component source and webpack demo app. For project
background and the verified setup, see the [root README](../README.md).

## Run a local demo

```sh
# From web-components/
npm ci --ignore-scripts
DWCK_APP_NAME=workshop npm run serve -- --no-open
```

To build the same demo into `dist/`:

```sh
DWCK_APP_NAME=workshop npm run build:prod
```

The current entry point imports all components into an application bundle. A
library build with per-component exports, types and a publication process is
still planned. The package's `npm test` command is a failing placeholder, and
there is no lint script or automated browser suite yet.

## Source map

| Area               | Source and examples                                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI                 | [Accordion](src/components/accordion/), [flip card](src/components/flip-card/), [modal](src/components/modal/), [cards](src/components/cards/), [popover menu](src/components/pop-over-menu/) |
| Data visualization | [Charts](src/components/chart/), [graphs](src/components/graph/), [map](src/components/geo-map/)                                                                                              |
| Layout             | [App layout](src/layouts/app/), [router](src/layouts/router/), [mobile](src/layouts/mobile/), [landing](src/layouts/landing/)                                                                 |
| Data               | [Data services](src/services/data/), [UI data bindings](src/services/ui/)                                                                                                                     |
| Behavior           | [Events](src/services/event-stream/), [state machine](src/services/state-machine/), [workers](src/services/web-worker/)                                                                       |
| Helpers and styles | [DOM helpers](src/global/web-tools/), [themes](src/global/themes/)                                                                                                                            |

Some components have only an implementation or a design sketch; this catalog
is not a claim that every component works. Historical demos with
`cdn.example.invalid` need local imports before use. The maintained source is
`src/`; generated bundles are not a substitute for it.

The project uses [MIT](../LICENSE), with the earlier ISC declaration recorded
in [LICENSES/ISC.txt](../LICENSES/ISC.txt). Third-party licenses remain separate.
