import { useEffect, useState } from 'react'
import { ShieldCheck, ShieldAlert, History, Gift } from 'lucide-react'
import { storage, ClaimLog } from '../storage'

function App() {
    const [enabled, setEnabled] = useState(true)
    const [logs, setLogs] = useState<ClaimLog[]>([])

    useEffect(() => {
        // Initial Load
        const loadData = async () => {
            const data = await storage.get()
            setEnabled(data.enabled)
            setLogs(data.logs)
        }
        loadData()

        // Listen for changes
        const listener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
            if (changes.enabled) setEnabled(changes.enabled.newValue)
            if (changes.logs) setLogs(changes.logs.newValue)
        }
        chrome.storage.onChanged.addListener(listener)

        return () => chrome.storage.onChanged.removeListener(listener)
    }, [])

    const toggleEnabled = async () => {
        const newState = !enabled;
        // Optimistic update
        setEnabled(newState);
        await storage.set({ enabled: newState });
    }

    return (
        <div className="w-[320px] bg-white dark:bg-gray-950 text-slate-900 dark:text-white font-sans overflow-hidden transition-colors duration-200">
            {/* Header */}
            <div className="bg-slate-50 dark:bg-gray-900 p-4 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-purple-600 p-1.5 rounded-lg shadow-sm">
                        <Gift size={18} className="text-white" />
                    </div>
                    <h1 className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                        Bonus<span className="text-purple-600 dark:text-purple-400">Claimer</span>
                    </h1>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full border font-medium ${enabled
                    ? 'border-green-500/30 text-green-700 dark:text-green-400 bg-green-500/10'
                    : 'border-red-500/30 text-red-700 dark:text-red-400 bg-red-500/10'
                    }`}>
                    {enabled ? 'Active' : 'Paused'}
                </div>
            </div>

            {/* Main Control */}
            <div className="p-4">
                <div
                    onClick={toggleEnabled}
                    className={`group cursor-pointer relative overflow-hidden rounded-xl p-4 transition-all duration-300 border shadow-sm ${enabled
                        ? 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/30 border-purple-200 dark:border-purple-500/30 hover:border-purple-300 dark:hover:border-purple-400/50'
                        : 'bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600'
                        }`}
                >
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full transition-colors ${enabled
                                ? 'bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-purple-900/20'
                                : 'bg-slate-200 dark:bg-gray-700 text-slate-500 dark:text-gray-400'
                                }`}>
                                {enabled ? <ShieldCheck size={24} /> : <ShieldAlert size={24} />}
                            </div>
                            <div>
                                <div className={`font-semibold text-base ${enabled ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-400'}`}>
                                    Auto-Claiming
                                </div>
                                <div className="text-xs text-slate-500 dark:text-gray-400">{enabled ? 'Monitoring active streams...' : 'Click to resume monitoring'}</div>
                            </div>
                        </div>
                        <div className={`w-10 h-6 rounded-full p-1 transition-colors ${enabled ? 'bg-purple-600' : 'bg-slate-300 dark:bg-gray-700'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                    </div>
                </div>

                {/* Stats / Logs */}
                <div className="mt-5">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h2 className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                            <History size={12} /> Recent Claims
                        </h2>
                        <span className="text-xs text-slate-500 dark:text-gray-500">{logs.length} total</span>
                    </div>

                    <div className="bg-slate-50 dark:bg-gray-900/50 rounded-lg border border-slate-200 dark:border-gray-800 h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {logs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-gray-600 gap-2">
                                <History size={24} className="opacity-30" />
                                <p className="text-xs">No bonuses claimed yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-200/50 dark:divide-gray-800/50">
                                {logs.map((log) => (
                                    <div key={log.id} className="p-3 hover:bg-white dark:hover:bg-white/5 transition-colors flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                                            <span className="text-sm text-slate-700 dark:text-gray-300 font-medium">{log.channel}</span>
                                        </div>
                                        <span className="text-xs text-slate-400 dark:text-gray-500 font-mono group-hover:text-slate-600 dark:group-hover:text-gray-400">
                                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-900/50 text-center">
                <p className="text-[10px] text-slate-500 dark:text-gray-600 hover:text-slate-700 dark:hover:text-gray-500 transition-colors cursor-default">Twitch Bonus Claimer by Reliq Arts</p>
            </div>
        </div>
    )
}

export default App
