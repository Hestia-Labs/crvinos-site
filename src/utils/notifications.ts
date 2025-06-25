import { NotificationPop } from "@/types/Notifications";

// Helper function to determine if a notification should be shown based on frequency
export function shouldShowNotification(
    notification: NotificationPop, 
    storageKey: string
): boolean {
    // If no localStorage available (server-side), default to true
    if (typeof window === 'undefined' || !window.localStorage) {
        return true;
    }

    const { frequency } = notification.displayOptions;
    const notificationHistory = localStorage.getItem(storageKey);
    
    // If no history, always show
    if (!notificationHistory) {
        return true;
    }

    try {
        const history = JSON.parse(notificationHistory);
        const lastShown = new Date(history.lastShown);
        const now = new Date();
        
        switch (frequency) {
            case 'everyVisit':
                return true;
            case 'daily':
                // Show if more than 24 hours have passed
                return (now.getTime() - lastShown.getTime()) > (24 * 60 * 60 * 1000);
            case 'weekly':
                // Show if more than 7 days have passed
                return (now.getTime() - lastShown.getTime()) > (7 * 24 * 60 * 60 * 1000);
            case 'once':
                // Show only if the specific notification wasn't shown before
                return !history.shownNotifications.includes(notification.title);
            default:
                return true;
        }
    } catch (error) {
        console.error('Error parsing notification history:', error);
        return true;
    }
} 