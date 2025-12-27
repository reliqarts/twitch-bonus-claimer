# Twitch Bonus Claimer

<div align="center">
  <img src="public/img/icons/icon-128.png" alt="Twitch Bonus Claimer Icon" width="128" />
  <br />
  <br />

  [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
  [![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](Makefile)
  [![Privacy Policy](https://img.shields.io/badge/Privacy-Policy-purple)](PRIVACY.md)

  **A lightweight Chrome Extension that automatically claims [Channel Points](https://help.twitch.tv/s/article/channel-points-faq) on Twitch.**
  <br />
  *Never miss a bonus chest again.*
</div>

---

## 🎁 Features

-   **Auto-Claim**: Automatically detects and clicks the "Bonus Chest" button when it appears.
-   **Human-Like Behavior**: Adds a random delay (0.5s - 2s) before clicking to simulate natural interaction.
-   **Smart Logging**: Keeps a local history of all claimed bonuses (stored only on your device).
-   **Beautiful UI**: A clean, dark-mode compatible popup to toggle the extension and view stats.
-   **Privacy Focused**: No analytics, no tracking, locally operating.

## 🚀 Installation

### From Source (Developer Mode)

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/reliqarts/twitch-bonus-claimer.git
    cd twitch-bonus-claimer
    ```

2.  **Build the project**:
    You can use `make` (macOS/Linux) or `npm` directly.
    ```bash
    make
    # OR
    npm install && npm run build
    ```

3.  **Load in Chrome**:
    1.  Open Chrome and navigate to `chrome://extensions/`.
    2.  Toggle **Developer mode** (top right).
    3.  Click **Load unpacked**.
    4.  Select the `dist/` folder from the project directory.

## 🛠 Usage

1.  Open any Twitch stream.
2.  The extension icon will light up in your toolbar.
3.  Click the icon to see your status ("Active") and recent claims.
4.  Relax! The extension will silently claim bonuses in the background.

## 🔒 Privacy

We take privacy seriously. This extension:
-   Runs entirely on your device (Client-Side).
-   Does **not** transmit data to any external server.
-   Does **not** collect personal information.

See our full [Privacy Policy](privacy.md).

## 👨‍💻 Development

This project is built with:
-   [Vite](https://vitejs.dev/) & [CRXJS](https://crxjs.dev/)
-   [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
-   [TailwindCSS](https://tailwindcss.com/)

**Key Commands:**
-   `make`: Install deps & build.
-   `make clean`: Remove build artifacts.
-   `npm run dev`: Start dev server (Note: HMR may be unstable in some environments; Build workflow recommended).

---

<div align="center">
  <sub>Built with 💜 by Reliq</sub>
</div>
