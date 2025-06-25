'use client';

import React, { useState, useEffect } from 'react';
import { getNotificationPops } from '@/app/actions/getNotifications';
import { shouldShowNotification } from '@/utils/notifications';
import { NotificationPop } from '@/types/Notifications';
import NotificationPopup from './Popup';

const NOTIFICATION_HISTORY_KEY = 'cr-vinos-notification-history';
const AGE_CONFIRMED_KEY = 'ageConfirmed';

const NotificationPopupContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationPop[]>([]);
  const [activeNotification, setActiveNotification] = useState<NotificationPop | null>(null);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [checkingCookies, setCheckingCookies] = useState(true);

  // Fetch notifications on component mount
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const notificationData = await getNotificationPops();
        setNotifications(notificationData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }

    fetchNotifications();
  }, []);

  // Check age verification cookie
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if age is confirmed
    const ageConfirmedCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${AGE_CONFIRMED_KEY}=`))
      ?.split('=')[1];

    setAgeConfirmed(ageConfirmedCookie === 'true');
    setCheckingCookies(false);
  }, []);

  // Show notification after age verification with a delay
  useEffect(() => {
    if (checkingCookies || !ageConfirmed || notifications.length === 0) return;

    // Find the first notification that should be shown based on frequency settings
    const notificationToShow = notifications.find(notification => 
      shouldShowNotification(notification, NOTIFICATION_HISTORY_KEY)
    );

    if (!notificationToShow) return;

    // Get the delay from the notification or default to 5 seconds
    const delaySeconds = notificationToShow.displayOptions?.delay || 5;

    // Show the notification after the specified delay
    const timer = setTimeout(() => {
      setActiveNotification(notificationToShow);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [notifications, ageConfirmed, checkingCookies]);

  if (!activeNotification) return null;

  return (
    <NotificationPopup 
      notification={activeNotification} 
      onClose={() => setActiveNotification(null)} 
    />
  );
};

export default NotificationPopupContainer;