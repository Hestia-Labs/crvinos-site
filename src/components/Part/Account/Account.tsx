"use client";
import React, { useEffect } from 'react';

import LoadingScreen from '@/components/Loaders/LoadingScreen';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import BasicButton from '@/components/Buttons/BasicButton';

const AccountComponent: React.FC = () => {
    const { isLoggedIn, isLoggingIn } = useAuth();
    const router = useRouter();

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         if (!isLoggedIn && !isLoggingIn) {
    //             router.push('/account/login');
    //         } else if (isLoggedIn) {
    //             router.push('/account/profile');
    //         }
    //     }, 3000);  
        
    //     return () => clearTimeout(timeout);
    // }, [isLoggedIn, isLoggingIn, router]);

    return (
        <div className='flex flex-col items-center justify-start px-4 py-8 sm:px-6 lg:px-8'>
            {/* <LoadingScreen /> */}
            <div className='max-w-md w-full space-y-6 flex flex-col justify-center items-center'>
                <p className='text-crred text-xl sm:text-2xl mt-4 text-center'>
                    El portal de cuentas de CRVinos está en construcción.
                </p>
                <p className='text-gray-700 text-base sm:text-lg mt-2 text-center'>
                    Estamos trabajando arduamente para crear una experiencia que esté a la altura de la calidad de nuestros vinos. Nuestro equipo se dedica a diseñar un portal que no solo sea funcional, sino también elegante y fácil de usar, para que puedas disfrutar de nuestros productos con la misma pasión con la que los elaboramos.
                </p>
                <BasicButton
                    variant='bg-crred'
                    className='border border-crred'
                    link='/'
                >
                    Volver a la página principal
                </BasicButton>
            </div>
        </div>
    );
};

export default AccountComponent;
