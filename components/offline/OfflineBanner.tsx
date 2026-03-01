'use client';

import React from 'react';
import { useOffline } from './OfflineProvider';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineBanner() {
    const { isOnline } = useOffline();

    return (
        <AnimatePresence>
            {!isOnline && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="sticky top-0 z-50 w-full bg-amber-500 text-white py-2 px-4 shadow-md overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-center space-x-3 text-sm font-medium">
                        <WifiOff className="w-4 h-4 animate-pulse" />
                        <span>You are currently offline. Some features may be unavailable, but your actions will be queued.</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
