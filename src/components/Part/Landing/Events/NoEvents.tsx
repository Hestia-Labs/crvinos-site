import React from 'react';
import { useRouter } from 'next/navigation';
import BasicButton from '@/components/Buttons/BasicButton';
import { motion } from 'framer-motion';

const NoEvents: React.FC = () => {
    const router = useRouter();

    const handleExplorePastEvents = () => {
        router.push('/enotourism');
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-center justify-center text-center py-8 px-4"
        >
            <div className="max-w-2xl space-y-8">
                {/* Calendar Icon */}
                <div className="flex justify-center">
                    <svg
                        className="w-16 h-16 text-crred opacity-80"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={0.5}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <p className="text-gray-600 font-light leading-relaxed max-w-md mx-auto text-base md:text-lg">
                        Estamos preparando nuevas experiencias. Suscríbete a nuestro 
                        newsletter para ser el primero en enterarte de nuestras próximas 
                        actividades.
                    </p>
                </div>

                {/* Action Button */}
                
                <BasicButton
                    variant="transparent"
                    onClick={handleExplorePastEvents}
                    className="border-crred border text-crred "
                >
                    Ver Eventos Anteriores
                </BasicButton>
               
            </div>
        </motion.div>
    );
};

export default NoEvents;