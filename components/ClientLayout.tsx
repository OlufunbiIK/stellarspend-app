'use client';

import { useEffect } from "react";
import { OfflineProvider } from "@/components/offline/OfflineProvider";
import OfflineBanner from "@/components/offline/OfflineBanner";
import QueuedActions from "@/components/offline/QueuedActions";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker
                    .register('/sw.js')
                    .then((registration) => {
                        console.log('[Service Worker] Registered with scope:', registration.scope);
                    })
                    .catch((error) => {
                        console.error('[Service Worker] Registration failed:', error);
                    });
            });
        }
    }, []);

    return (
        <OfflineProvider>
            <OfflineBanner />
            <main className="min-h-screen">
                {children}
            </main>
            <QueuedActions />
        </OfflineProvider>
    );
}
