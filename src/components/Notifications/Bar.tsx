'use client';
import React, { useEffect, useState } from 'react';
import { getNotificationBars } from '@/app/actions/getNotifications';
import { NotificationBar } from '@/types/Notifications';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

const NotificationBarComponent: React.FC = () => {
  const [bars, setBars] = useState<NotificationBar[]>([]);
  const [currentBarIndex, setCurrentBarIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchNotificationBars() {
      const fetchedBars = await getNotificationBars();
      setBars(fetchedBars);
    }
    fetchNotificationBars();
  }, []);

  useEffect(() => {
    if (bars.length > 1) {
      const interval = setInterval(() => {
        setCurrentBarIndex((prevIndex) => (prevIndex + 1) % bars.length);
      }, 6000); // Increased interval to 6000ms to add a delay between iterations
      return () => clearInterval(interval);
    }
  }, [bars]);

  if (bars.length === 0) {
    return null;
  }

  const handleClick = () => {
    const currentBar = bars[currentBarIndex];
    if (currentBar.link) {
      router.push(currentBar.link);
    }
  };

  return (
    <div 
      className={clsx(
        "relative top-0 left-0 right-0 bg-accred text-back p-1 z-50 overflow-hidden",
        { "cursor-pointer": bars[currentBarIndex].link }
      )}
      onClick={handleClick}
    >
      <div className="flex flex-col justify-center items-center h-6" >
        <AnimatePresence>
          <motion.span
            key={bars[currentBarIndex].message}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { ease: "easeIn", duration: 0.5 }}}
            exit={{ opacity: 0, y: -20, transition: { ease: "easeOut", duration: 0.5 } }}
            className="italic text-sm"
          >
            {bars[currentBarIndex].message}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationBarComponent;
