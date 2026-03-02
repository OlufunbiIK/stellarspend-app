'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Represents a pending action that was queued while offline.
 */
export interface QueuedAction {
    id: string;
    type: string;
    description: string;
    data: any;
    timestamp: number;
}

interface OfflineContextType {
    isOnline: boolean;
    queuedActions: QueuedAction[];
    queueAction: (type: string, description: string, data: any) => void;
    removeAction: (id: string) => void;
    clearQueue: () => void;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

const QUEUE_STORAGE_KEY = 'stellarspend_offline_queue';

export function OfflineProvider({ children }: { children: React.ReactNode }) {
    const [isOnline, setIsOnline] = useState<boolean>(true);
    const [queuedActions, setQueuedActions] = useState<QueuedAction[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize online status and load queue from localStorage
    useEffect(() => {
        setIsOnline(navigator.onLine);

        const savedQueue = localStorage.getItem(QUEUE_STORAGE_KEY);
        if (savedQueue) {
            try {
                setQueuedActions(JSON.parse(savedQueue));
            } catch (e) {
                console.error('Failed to parse offline queue', e);
            }
        }

        setIsInitialized(true);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Persist queue to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queuedActions));
        }
    }, [queuedActions, isInitialized]);

    const queueAction = (type: string, description: string, data: any) => {
        const newAction: QueuedAction = {
            id: Math.random().toString(36).substring(2, 9),
            type,
            description,
            data,
            timestamp: Date.now(),
        };
        setQueuedActions((prev) => [...prev, newAction]);
    };

    const removeAction = (id: string) => {
        setQueuedActions((prev) => prev.filter((action) => action.id !== id));
    };

    const clearQueue = () => {
        setQueuedActions([]);
    };

    return (
        <OfflineContext.Provider
            value={{
                isOnline,
                queuedActions,
                queueAction,
                removeAction,
                clearQueue,
            }}
        >
            {children}
        </OfflineContext.Provider>
    );
}

export function useOffline() {
    const context = useContext(OfflineContext);
    if (context === undefined) {
        throw new Error('useOffline must be used within an OfflineProvider');
    }
    return context;
}
