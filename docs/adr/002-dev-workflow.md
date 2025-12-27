# 2. Development & Testing Workflow

Date: 2025-12-26

## Status

Accepted

## Context

Establishing a standard development and testing workflow is critical for efficiency. The project initially attempted to use the Vite Dev Server for HMR, but encountered persistent connection issues in specific environments.

## Decision

We will use a **Build-First Workflow** for this extension.

**Reasoning:**
1.  **Reliability**: The Vite Dev Server can experience connection issues (`Cannot connect to Vite Dev Server`) when running in the context of a Chrome Extension on certain macOS configurations or when ports are conflicted.
2.  **Production Parity**: Running from a production build (`dist/`) ensures that what you are testing is *exactly* what gets published. There are no dev-only artifacts or websocket connections that might fail in the real world.
3.  **Simplicity**: This approach removes the need for complex proxy/host configurations in `vite.config.ts`.

## Selected Workflow

1.  **Development Loop**:
    -   Make code changes.
    -   Run `npm run build` (or `npm run build -- --watch` for semi-live updates).
    -   **Chrome -> Extensions -> Reload** the unpacked extension.

2.  **Why not `npm run dev`?**:
    -   While `npm run dev` offers HMR, it requires a websocket connection between the browser extension and the local node process. This has proven unstable in some environments. The static build approach, while slightly slower (requires a reload click), is 100% reliable.

3.  **Testing Strategy**:
    -   **Manual Verification**: Loading the unpacked extension from `dist/` and interacting with live Twitch streams.
