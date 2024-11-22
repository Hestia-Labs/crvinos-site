import React from 'react';
import { useRouter } from 'next/navigation';
import BasicButtom from '@/components/Buttons/BasicButton';

const NoEvents: React.FC = () => {
    const router = useRouter();

    const handleExplorePastEvents = () => {
        router.push('/enoturism');
    };

    return (
        <div className="w-full flex flex-col items-center justify-center text-center text-crred md:text-xl py-6">
            <div className="flex flex-col items-center space-y-6">
                {/* Icon or Image */}
                {/* Uncomment and replace with your icon or image if desired */}
                {/* <svg
                    className="w-16 h-16 text-crred"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 9V5a1 1 0 10-2 0v4H10V5a1 1 0 10-2 0v4H5v10h14V9h-3z"
                    />
                </svg> */}
                {/* Message */}
                <h3 className="text-2xl font-semibold">
                    No hay eventos próximos
                </h3>
                <p className="text-base text-gray-700 font-light max-w-md">
                    Actualmente no tenemos eventos programados. Por favor,
                    vuelve a comprobar más tarde para enterarte de nuestros
                    próximos eventos.
                </p>
                {/* Button to Explore Past Events */}
                <BasicButtom
                    variant='transparent'
                    onClick={handleExplorePastEvents}
                    className="border border-crred text-base"
                >
                    Explorar eventos pasados
                </BasicButtom>
            </div>
        </div>
    );
};

export default NoEvents;
