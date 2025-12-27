export interface ClaimLog {
    id: string;
    timestamp: number;
    channel: string;
}

export interface StorageSchema {
    enabled: boolean;
    logs: ClaimLog[];
}

const DEFAULT_SETTINGS: StorageSchema = {
    enabled: true,
    logs: [],
};

export const storage = {
    get: async (): Promise<StorageSchema> => {
        const result = await chrome.storage.local.get(['enabled', 'logs']);
        return {
            enabled: result.enabled ?? DEFAULT_SETTINGS.enabled,
            logs: result.logs ?? DEFAULT_SETTINGS.logs,
        };
    },

    set: async (data: Partial<StorageSchema>): Promise<void> => {
        await chrome.storage.local.set(data);
    },

    addLog: async (log: Omit<ClaimLog, 'id'>): Promise<void> => {
        const { logs } = await storage.get();
        const newLog: ClaimLog = { ...log, id: crypto.randomUUID() };
        // Keep only last 50 logs to save space
        const updatedLogs = [newLog, ...logs].slice(0, 50);
        await storage.set({ logs: updatedLogs });
    },

    clearLogs: async (): Promise<void> => {
        await storage.set({ logs: [] });
    },
};
