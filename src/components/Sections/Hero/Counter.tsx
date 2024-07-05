"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';

const Counter: React.FC = () => {
    const targetDate = new Date('August 1, 2024').getTime();
    const t = useTranslations();

    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        let timeLeft = {
            days: { value: 0, name: t('dys') },
            hours: { value: 0, name: t('hr') },
            minutes: { value: 0, name: t('min') },
            seconds: { value: 0, name: t('seg') },
        };

        if (difference > 0) {
            timeLeft = {
                days: { value: Math.floor(difference / (1000 * 60 * 60 * 24)), name: t('dys') },
                hours: { value: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), name: t('hr') },
                minutes: { value: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)), name: t('min') },
                seconds: { value: Math.floor((difference % (1000 * 60)) / 1000), name: t('seg') },
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const memoizedTimeLeft = useMemo(() => timeLeft, [timeLeft]);

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-white mb-5 lg:text-8xl md:text-3xl text-xl" style={{ letterSpacing: '20%', fontWeight: '150' }}>{t("header")}</h2>
            <div className="text-white flex lg:space-x-9 md:space-x-6 space-x-5">
                {Object.entries(memoizedTimeLeft).map(([unit, { value, name }]) => (
                    <div key={unit} className='flex flex-col items-center justify-center'>
                       {  hasMounted ? <h3 className='lg:text-5xl md:text-3xl text-2xl' style={{ letterSpacing: '10%', fontWeight: '100' }}>{value}</h3> :
                        <h3 className='lg:text-5xl md:text-3xl text-2xl animate-bounce' style={{ letterSpacing: '10%', fontWeight: '100' }}>0</h3>}
                        <h3 className='text-[#8D131E] font-semibold lg:text-2xl md:text-xl text-lg' style={{ letterSpacing: '10%' }}>{name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Counter;
