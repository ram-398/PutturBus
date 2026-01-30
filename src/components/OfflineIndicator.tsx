"use client";

import { useOnlineStatus } from "@/hooks/use-online";
import { WifiOff, Phone, AlertTriangle } from "lucide-react";

export function OfflineIndicator() {
    const isOnline = useOnlineStatus();

    if (isOnline) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400">
                <WifiOff className="w-10 h-10" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-2">You are Offline</h1>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                No internet connection detected. Emergency contacts are available below.
            </p>

            <div className="w-full max-w-sm space-y-4">
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-600 shadow-sm shrink-0">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="text-left flex-1">
                        <div className="font-bold text-red-900">Emergency (Police)</div>
                        <a href="tel:100" className="text-sm font-bold text-red-600 hover:underline">Call 100</a>
                    </div>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm shrink-0">
                        <Phone className="w-5 h-5" />
                    </div>
                    <div className="text-left flex-1">
                        <div className="font-bold text-green-900">KSRTC Helpline</div>
                        <a href="tel:080-26252625" className="text-sm font-bold text-green-600 hover:underline">Call 080-26252625</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
