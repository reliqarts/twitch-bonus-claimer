import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

const { version } = packageJson

// Convert from Semver (e.g., 0.1.0-beta.6)
const [major, minor, patch, label = '0'] = version
    // Remove all non-numeric characters except dots and dashes
    .replace(/[^\d.-]+/g, '')
    // Split by dot or dash
    .split(/[.-]/)
    // Filter out empty strings
    .filter(Boolean)

export default defineManifest(async (env) => ({
    manifest_version: 3,
    name:
        env.mode === 'staging'
            ? '[INTERNAL] Twitch Bonus Claimer'
            : 'Twitch Bonus Claimer',
    description: 'Twitch Bonus Claimer by Reliq for chromium based browsers. Automatically claim twitch channel points for open twitch streams!',
    // up to four numbers separated by dots
    version: `${major}.${minor}.${patch}.${label}`,
    // semver is OK in "version_name"
    version_name: version,
    icons: {
        '16': 'img/icons/icon-16.png',
        '48': 'img/icons/icon-48.png',
        '128': 'img/icons/icon-128.png',
    },
    action: {
        default_popup: 'src/popup/index.html',
    },
    permissions: ['storage'],
    content_scripts: [
        {
            matches: ['https://*.twitch.tv/*'],
            js: ['src/content/index.ts'],
        },
    ],
}))
