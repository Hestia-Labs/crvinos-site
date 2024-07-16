'use client';
import React from 'react';
import Icon from "../Icons";
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavbarProps {
    red?: boolean;
    relative?: boolean;
}

export default function Navbar({ red, relative }: NavbarProps) {

    const textColor = red ? 'text-crred' : 'text-white';
    const borderColor = red ? 'border-crred' : 'border-white';
    const positionClass = relative ? 'relative' : 'absolute';

    return (
        <nav className={`w-full flex justify-between items-center px-32 py-2 bg-transparent z-50 ${positionClass} top-0 left-0 right-0`}>
            <Icon name={`CRVinos${red ? '-red' : ''}`} className="h-20 w-20 md:h-28 md:w-28" />
            <motion.div 
                className={`flex border-b-2 ${borderColor}`}
            >
                <div className="flex space-x-10 py-2 justify-center items-center md:text-sm text-xs">
                    {['Nosotros', 'Blog', 'Catalogo','Contacto', 'Enoturismo'].map((item, index) => (
                        <motion.div
                            key={index} 
                            whileHover={{ y: -3 }}
                            whileTap={{ y: -3 }}
                            initial={{ y: 0 }}
                            animate={{ y: 0 }}
                            exit={{ y: 0 }}
                            transition={{ type: 'ease-in', stiffness: 300 }}
                            className={textColor}
                        >
                            <Link href={`/${item.toLowerCase()}`}>
                                {item}
                            </Link>
                        </motion.div>
                    ))}
                    <div className='flex space-x-4 items-center justify-center'>
                        {['Search', 'Shopping'].map((iconName, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -3 }}
                                whileTap={{ y: -3 }}
                                initial={{ y: 0 }}
                                animate={{ y: 0 }}
                                exit={{ y: 0 }}
                                transition={{ type: 'ease-in', stiffness: 300 }}
                                className={textColor}
                            >
                                <Link href="/contact">
                                    <Icon name={`${iconName}${red ? '-red' : ''}`} className="h-20 w-20 md:h-5 md:w-5" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </nav>
    );
}

