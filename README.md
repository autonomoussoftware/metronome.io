# Metronome Site

[![Build Status](https://travis-ci.com/autonomoussoftware/metronome.io.svg?branch=master)](https://travis-ci.com/autonomoussoftware/metronome.io)

## Setup

Set the following variables in a `.env` file:

- `REACT_APP_ENABLED_CHAINS`: comma-separated list of enabled chains, e.g. `ethRopsten, etcMorden`. Chain names must match a valid configuration file inside `src/config` directory. Defaults to `ethMainnet`.
- `REACT_APP_ROPSTEN_API_URL`: defaults to `http://localhost:3002/`
- `REACT_APP_MORDEN_API_URL`: defaults to `http://localhost:3012/`

Other overridable variables with proper defaults:

- `REACT_APP_ENGAGE_FORM_URL`
- `REACT_APP_GA_TRACKING_ID`
- `REACT_APP_SENTRY_DNS`

Then install dependencies:

```bash
npm install
```

## Build

```bash
npm run build
```

The built files will be located in the `build` directory ready to be served by any HTTP server.

## Development

To develop the **React** part of the site with live-reload when files under `/src` change, run:

```bash
npm run start
```

The site will open in the port 3001.

To develop the **static** part of the site with live-reload when files under `/public` or `/src-static` change, run:

```bash
npm run start:static
```

## License

MIT