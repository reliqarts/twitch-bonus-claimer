# 1. Stack Selection

Date: 2025-12-26

## Status

Accepted

## Context

The Twitch Bonus Claimer project requires a robust, modern development environment for building a Chrome Extension (Manifest V3). 
The technical requirements include:
- Strict type safety and maintainability.
- Seamless integration with Chrome Extension specific APIs and manifest generation.
- A component-based UI architecture for the popup and potential options pages.
- Rapid UI development capabilities.

## Decision

The following technology stack has been selected:

1.  **Build Tool**: [Vite](https://vitejs.dev/)
    -   **Reason**: Provides an extremely fast development server with native ES modules support and a rich ecosystem.
2.  **Extension Tooling**: [CRXJS Vite Plugin](https://crxjs.dev/vite-plugin)
    -   **Reason**: Offers first-class support for Chrome Extensions within Vite, handling HMR (Hot Module Replacement) and manifest generation automatically.
3.  **Language**: **TypeScript**
    -   **Reason**: Ensures type safety across the codebase, reducing runtime errors and improving developer experience with better tooling support.
4.  **UI Framework**: **React**
    -   **Reason**: Facilitates a modular, component-driven approach. While the initial UI is simple, React allows for effortless scaling and state management as features grow.
5.  **Styling**: **TailwindCSS**
    -   **Reason**: Enables rapid styling directly within markup, reducing context switching and maintaining a small CSS bundle size.

## Consequences

-   **Positive**:
    -   Development speed is significantly increased due to HMR and modern tooling.
    -   Code quality is enforced via TypeScript.
    -   The architecture is future-proof and scalable.
-   **Negative**:
    -   Introduces a build step complexity compared to vanilla JavaScript, which is mitigated by Vite's zero-config philosophy.
