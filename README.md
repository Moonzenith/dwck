# Devarchy Web Components Kit (dWCk)

dWCk is a collection of native Web Components for developers building web apps
and learning how to compose behavior in HTML. It uses custom elements, Shadow
DOM, slots and DOM events, with JavaScript helpers for data, routing and state.
The demos are bundled with webpack; optional components use Dexie, localForage,
XState, Chart.js, Cytoscape, vis-network and MapLibre GL.

**Status: being revived.** The component demo builds, but a build is not a
browser compatibility test. The legacy CDK app compiles and its single Jest
scaffold test passes without assertions. There are no automated component
tests or configured lint command yet. See [ROADMAP.md](ROADMAP.md) for the
remaining work and acceptance criteria.

## Origin and maintainers

Diego Torres started the project in 2023, originally for open-source talks and
workshops while he worked at Amazon. Alejandro Quiroz (Moonzenith) contributed
the packaging, folder structure and CLI and is continuing its revival here.
The project has moved between repositories over time; this repository retains
the original contribution history and continues that work.

The current maintainer is [Moonzenith](https://github.com/Moonzenith). Other
contributors include Marco Del Boccio, Conor Casey and the authors recorded in
Git. Author names and copyright notices are retained; demo data is fictional.

## Quick start

The commands below were checked on Node.js 24.15.0 and npm 11.12.1.
Use a shell that supports `NAME=value command`, such as Bash or Zsh.
The local component demo requires no AWS account or credentials.

```sh
git clone https://github.com/Moonzenith/dwck.git
cd dwck/web-components
npm ci --ignore-scripts

# Development server: http://localhost:8080
DWCK_APP_NAME=workshop npm run serve -- --no-open
```

In another terminal, or after stopping the server, build the same demo:

```sh
# From web-components/
DWCK_APP_NAME=workshop npm run build:prod
```

The output is written to `web-components/dist/`. This is an application/demo
bundle, not a finished npm library distribution. Install scripts are not needed
for this verified demo. The production build reports bundle-size and service
worker precache warnings; the dependency metadata also needs updating.

`DWCK_APP_NAME` chooses `index.<name>.html`. Other demos include `chart`, `graph`,
`layout`, `router`, `state-machine` and `game`; they are experiments and have not
all been verified. Some historical pages contain `cdn.example.invalid` as an
explicit placeholder for a retired deployment. They require migration to local
imports before they can run independently.

## Using the components

Components communicate through DOM events and attributes. For example, once the
kit is loaded by the demo bundle:

```html
<flip-card>
  <h1 slot="front">Front</h1>
  <section slot="back">Back</section>
</flip-card>

<button id="open-counter-modal">Open</button>
<app-modal
  id="counter-modal"
  trigger="#open-counter-modal"
>
  <h1 slot="title">New counter</h1>
  <section slot="main">
    <input
      type="text"
      name="name"
    />
  </section>
</app-modal>
```

See the [component package](web-components/README.md) for source links and the
[workshop](docs/workshop.md) for the original lessons. The lessons document an
older scaffolder; use the local quick start above to evaluate this checkout.

## Repository layout

| Path                                         | Purpose                                                 |
| -------------------------------------------- | ------------------------------------------------------- |
| `web-components/src/components/`             | UI, drag and drop, charts, graphs and maps              |
| `web-components/src/layouts/`                | App, mobile, landing, routing and shortcut layouts      |
| `web-components/src/services/`               | Data, events, state machine, workers and other services |
| `web-components/src/global/`                 | Shared DOM helpers, CSS tools and themes                |
| `web-components/index.*.html`                | Demo pages selected by `DWCK_APP_NAME`                  |
| `dwck/`                                      | Experimental scaffolding CLI                            |
| `docs/`                                      | Original workshops and lessons                          |
| `lib/`, `bin/`, `infra/`, `lambda/`, `test/` | Legacy CDK app and deployment experiments               |

The working component source is in `web-components/`. The unused `dwck-lib`
submodule entry and the broken root demo-selector symlink were removed. Run the
supported local demo through the webpack command in Quick start.

## CLI status

You can inspect the local CLI from the repository root:

```sh
npm --prefix dwck ci --ignore-scripts
node dwck/index.js --help
```

`project <name>` still clones the older repository's `development` branch and
has stale template paths. `serve <name>` replaces the local `index.html` with a
symlink; use the webpack command in Quick start for this repository instead.
`element <name>` currently only prints its options. These commands need repair
before they become the recommended onboarding path.

## Legacy CDK checks

The root `package.json` belongs to the old CDK app, not the component package:

```sh
# From the repository root
npm ci --ignore-scripts
npm run build
npm test -- --runInBand
```

The existing Jest test is an empty scaffold; passing it does not validate AWS
resources or component behavior. `npm run lint` is not configured. Deployment
outputs and old infrastructure identifiers are not part of the local demo;
the deployment experiments require a separate review and configuration.

## License

The current first-party manifests declare [MIT](LICENSE), as selected by the
maintainer. Earlier manifests declared ISC; the [historical ISC notice](LICENSES/ISC.txt)
records that provenance. Existing attribution is retained, and dependencies and
other third-party material keep their respective licenses. The MIT declaration
does not replace a third-party license or establish another contributor's consent.
