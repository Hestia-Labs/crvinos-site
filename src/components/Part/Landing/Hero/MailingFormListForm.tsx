// "use client";
// import React, { useState } from 'react';
// import { useTranslations } from 'next-intl';

// const MailingFormListForm = () => {
//     const t = useTranslations();
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('/api/addEmail', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email }),
//             });

//             if (response.ok) {
//                 setMessage('Pronto sabrás de nosotros. ¡Gracias!');
//                 setError('');
//             } else {
//                 const errorData: { error?: string } = await response.json();
//                 if (errorData.error === 'Email already exists') {
//                     setError('Email ya en la lista');
//                 } else if (errorData.error === 'Invalid or missing email') {
//                     setError('Email no válido o faltante');
//                 } else {
//                     setError(t('error'));
//                 }
//             }
//         } catch (error) {
//             setError(t('error'));
//         }
//     };

//     return (
//         <div className='flex flex-col justify-center md:mt-12 mt-8 items-center w-fit space-y-2'>
//             {message? (
//                 <h1 className='text-white  md:text-xl lg:text-3xl font-bold'>{message}</h1>
//             ) : (
//                 <>
//                     <h1 className='text-white md:text-3xl lg:text-5xl font-bold'>{t("cta")}</h1>
//                     <form onSubmit={handleSubmit} className='flex flex-col w-3/4 space-y-5'>
//                         <input
//                             type='text'
//                             placeholder={t("email")}
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className='border border-[#7F2121] placeholder-[#8D131E] bg-opacity-70 bg-white rounded-full px-4 py-2 mt-4 placeholder:text-xs w-full'
//                         />
//                         {error && <p className='text-red-500 text-xs md:text-sm lg:text-base '>{error}</p>}
//                         <button
//                             type='submit'
//                             className='bg-gradient-to-r from-[#3D1212] via-[#3D1212] to-[#912B2B] text-white px-4 py-2 border border-white rounded-full font-semibold text-xs md:text-sm'
//                         >
//                             {t("btn")}
//                         </button>
//                     </form>
//                 </>
//             )}
//         </div>
//     );
// };

// export default MailingFormListForm;
