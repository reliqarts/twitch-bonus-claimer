# Chrome Web Store Privacy Justifications

Copy and paste these answers into the **Privacy practices** tab of your item dashboard.

## 1. Single Purpose Description
> This extension automatically claims Twitch Channel Points (Bonus Chests) for the user while they watch streams.

## 2. Permission Justifications

### Host Permissions (`https://*.twitch.tv/*`)
> **Justification:** The extension requires access to Twitch pages to inject a content script. This script monitors the DOM for the appearance of the "Bonus Chest" button and simulates a user click to claim the points. The extension does not function without access to the page content on this specific domain.

### `storage` Permission
> **Justification:** The extension uses local storage to save the user's configuration (Enabled/Disabled state) and to maintain a temporary, local history of recent claims (channel name and timestamp) which is displayed in the popup UI. No data is transmitted to external servers.

## 3. Remote Code
**Question:** *"Does your extension use remote code?"*
> **Answer:** **NO**.
>
> *Note: Manifest V3 strictly prohibits remote code. If you selected "Yes", change it to "No". All your code is bundled inside the `dist` folder.*

## 4. Data Usage
**Question:** *"Does your extension collect user data?"*
> **Answer:** **NO**. (Or select "No, I do not collect user data" if available).
>
> *If forced to select specific types (because of `storage`):*
> Select **"User Activity"** -> **"Page Views"** (technically we see the page to find the button) -> Justification: "Processed locally to find the button. Not collected or sent."
>
> *However, usually for local-only apps, stating you don't collect data is accurate because 'collect' implies sending it off-device.*

## 5. Account Verification
> You must go to the **Account** tab in the dashboard and verify your email address. This is a one-time step required by Google.
