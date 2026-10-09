import React from 'react';
import { X, Smartphone, Download, Share2, PlusSquare, CheckCircle2, WifiOff, Laptop } from 'lucide-react';

export default function InstallPwaModal({
  isOpen,
  onClose,
  installPrompt,
  onInstallClick
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-750 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Install EcoConstruct Pro
              </h2>
              <p className="text-xs text-slate-400">
                Standalone Progressive Web App (PWA)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors touch-target"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          
          {/* Main App Preview Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-850 border border-emerald-800/50 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 p-2 shadow-lg flex items-center justify-center flex-shrink-0">
              <img src="/icons/favicon.svg" alt="App Icon" className="w-full h-full" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">EcoConstruct Pro</h3>
              <p className="text-xs text-slate-300">Fast, offline-ready & mobile-optimized.</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-emerald-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero app-store download needed</span>
              </div>
            </div>
          </div>

          {/* Native Install Button if supported */}
          {installPrompt && (
            <div>
              <button
                onClick={onInstallClick}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01] touch-target"
              >
                <Download className="w-5 h-5" />
                <span>Install Standalone App Now</span>
              </button>
            </div>
          )}

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 space-y-1">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <WifiOff className="w-3.5 h-3.5" />
                Offline Caching
              </div>
              <p className="text-slate-400 text-[11px]">
                Access technical specs and materials even on remote job sites without internet.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 space-y-1">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5" />
                Multi-Platform
              </div>
              <p className="text-slate-400 text-[11px]">
                Runs natively on Android, iOS Safari, macOS, Windows, and ChromeOS.
              </p>
            </div>
          </div>

          {/* Platform Instructions */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Installation Instructions
            </h4>

            {/* iOS Safari */}
            <div className="p-3.5 rounded-xl bg-slate-850/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>Apple iOS (Safari)</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 text-xs pl-1">
                <li>Tap the <strong className="text-white">Share</strong> icon at the bottom of Safari.</li>
                <li>Scroll down and tap <strong className="text-white">"Add to Home Screen"</strong> (<PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-emerald-400" />).</li>
                <li>Tap <strong className="text-emerald-400">Add</strong> in top right corner to launch as native app.</li>
              </ol>
            </div>

            {/* Android / Chrome */}
            <div className="p-3.5 rounded-xl bg-slate-850/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Android (Chrome & Brave)</span>
              </div>
              <p className="text-slate-300 text-xs">
                Tap the three dots (⋮) in the browser menu and select <strong className="text-white">"Install app"</strong> or <strong className="text-white">"Add to Home screen"</strong>.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-850 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-medium border border-slate-700 transition-colors touch-target"
          >
            Got it, Close
          </button>
        </div>

      </div>
    </div>
  );
}
