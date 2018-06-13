# Metronome Site

## Setup

Set the following variables in a `.env` file:

- `REACT_APP_CHAIN`: defaults to `mainnet`
- `REACT_APP_DESKTOP_APP_VERSION`: defaults to `v1.0.0`
- `REACT_APP_MET_API_URL`: defaults to `https://api.metronome.io`
- `REACT_APP_MET_EXPLORER_URL`: defaults to `https://explorer.metronome.io`

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

```bash
npm run dev
```

The site will open in the port 3001.

## License

MIT
