import { storage } from '../storage'

console.log('[Twitch Bonus Claimer] Content script loaded.')

const SELECTORS = {
    // Common selector for the channel points chest button
    bonusButton: '[aria-label="Claim Bonus"]',
    // Sometimes specific class names are stable enough
    bonusButtonClass: '.claimable-bonus__icon',
}

let observer: MutationObserver | null = null;
let isEnabled = true;
// Track processing state to avoid duplicate clicks for the same event
let isClaiming = false;

// Initialize
const init = async () => {
    const settings = await storage.get();
    isEnabled = settings.enabled;

    // Listen for setting changes
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.enabled) {
            isEnabled = changes.enabled.newValue;
            console.log(`[Twitch Bonus Claimer] Auto-claim is now ${isEnabled ? 'ENABLED' : 'DISABLED'}`);
        }
    });

    startObserving();
}

const startObserving = () => {
    if (observer) observer.disconnect();

    observer = new MutationObserver((mutations) => {
        if (!isEnabled) return;

        // Simple debounce/throttle check: if we are already handling a claim, ignore new mutations
        if (isClaiming) return;

        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                const button = checkForBonus();
                if (button) {
                    claimBonus(button);
                    break; // Found one, no need to keep checking mutations
                }
            }
        }
    });

    // Watch the entire body for now - can optimize to specific container if needed
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

const checkForBonus = (): HTMLElement | null => {
    return document.querySelector<HTMLElement>(SELECTORS.bonusButton) ||
        document.querySelector<HTMLElement>(SELECTORS.bonusButtonClass);
}

const claimBonus = async (button: HTMLElement) => {
    if (isClaiming) return;
    isClaiming = true;

    try {
        // Wait a random short delay to feel more human (500ms - 2000ms)
        const delay = 500 + Math.random() * 1500;

        console.log(`[Twitch Bonus Claimer] Bonus detected! Claiming in ${(delay / 1000).toFixed(1)}s...`);

        // Check again if it's still there after delay
        setTimeout(async () => {
            // Re-query to make sure we have a valid reference, or see if it's gone
            if (!document.contains(button)) {
                isClaiming = false;
                return;
            }

            button.click();
            console.log('[Twitch Bonus Claimer] Bonus claimed!');

            // Get Channel Name
            let channelName = 'Unknown Channel';
            const channelElement = document.querySelector('[data-a-target="user-channel-header-item"]');
            if (channelElement) {
                channelName = channelElement.textContent || channelName;
            } else {
                // Fallback: URL check
                const path = window.location.pathname.split('/').filter(Boolean);
                if (path.length > 0) channelName = path[0];
            }

            await storage.addLog({
                timestamp: Date.now(),
                channel: channelName
            });

            // Reset claiming lock after a bit of time to allow for next bonus (usually minutes away)
            setTimeout(() => {
                isClaiming = false;
            }, 5000);

        }, delay);

    } catch (error) {
        console.error('[Twitch Bonus Claimer] Error claiming bonus:', error);
        isClaiming = false;
    }
}

// Start
init();
