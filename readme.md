# Twitch Bonus Claimer

A simple Chrome Extension that automatically claims the "channel point bonus" chest on Twitch streams.

## Features

- **Auto-Claim**: Automatically detects and clicks the bonus button when it appears.
- **Multi-Stream Support**: Works on any open Twitch tab.
- **Simple UI**: Toggle the claimer on/off via the popup menu.

## Documentation

- [Architecture Decision Records](./docs/adr/)

## Installation

*(Coming Soon - This will be available as a loadable Chrome Extension)*

## Development

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Build the project:
    -   Using Make: `make` (Installs dependencies & builds)
    -   Using NPM: `npm install && npm run build`
    -   *Note: Using `npm run dev` is optional but may cause connection issues on some machines. The build workflow is recommended.*
4.  Load the extension in Chrome:
    -   Go to `chrome://extensions/`
    -   Enable "Developer mode"
    -   Click "Load unpacked"
    -   Select the `dist` folder.
