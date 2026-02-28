"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Trash2, Check, ExternalLink } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";
import { formatDistanceToNow } from "date-fns";

export const NotificationsCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, clearAll } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/5"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 z-50 w-80 sm:w-96 max-h-[500px] flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#080b18]/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between border-b border-white/5 p-5 bg-white/[0.02]">
                <h3 className="font-display font-semibold text-lg text-white">Notifications</h3>
                <div className="flex items-center gap-1">
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="p-2 text-[#7a8aaa] hover:text-red-400 transition-colors"
                      title="Clear all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-[#7a8aaa] hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto p-3 space-y-2 custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-[#7a8aaa]">
                    <div className="relative mb-4">
                      <Bell className="w-12 h-12 opacity-10" />
                      <div className="absolute inset-0 bg-[#e8b84b]/5 blur-xl rounded-full" />
                    </div>
                    <p className="text-sm font-light">No new transmissions</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`group relative flex flex-col gap-1.5 p-4 rounded-2xl transition-all cursor-pointer border ${
                        n.read
                          ? "bg-transparent border-transparent opacity-40 hover:opacity-60"
                          : "bg-white/[0.03] border-white/5 hover:border-[#e8b84b]/30 hover:bg-[#e8b84b]/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`text-sm leading-relaxed ${
                            n.read ? "text-[#7a8aaa]" : "text-white font-medium"
                          }`}
                        >
                          {n.message}
                        </span>
                        {!n.read && (
                          <div className="mt-1.5 h-2 w-2 rounded-full bg-[#e8b84b] shadow-[0_0_10px_rgba(232,184,75,0.5)] shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-[#7a8aaa] font-mono tracking-tighter">
                        {formatDistanceToNow(n.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
