'use client';
import React from 'react';
import Icon from "../Icons";
import Link from 'next/link';
import { motion, useAnimation, useScroll } from 'framer-motion';

export default function Navbar() {

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    };
    const animations = useAnimation();
    
    const hidden = async () => {
        await animations.start(variants.hidden);
    }
    const visible = async () => {
        await animations.start('visible');
    }



    return (
        <nav className=" w-full flex justify-between items-center px-32 py-4 bg-transparent z-50 absolute top-0 left-0 right-0">
            <Icon name="CRVinos" className="h-20 w-20 md:h-28 md:w-28  s" />
            <motion.div 
                className="flex border-b-2 border-white"
           
            >
                <div className="flex space-x-10 py-2 justify-center items-center md:text-sm text-xs">
                    {['Nosotros', 'Blog', 'Catalogo','Contact', 'Enoturismo', 'Contact'].map((item, index) => (
                        <motion.div
                            key={index} 
                            whileHover={{ y: -3 }}
                            whileTap={{ y: -3 }}
                            initial={{ y: 0 }}
                            animate={{ y: 0 }}
                            exit={{ y: 0 }}
                            transition={{ type: 'ease-in', stiffness: 300 }}
                            className="text-white"
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
                                className="text-white"
                            >
                                <Link href="/contact">
                                    <Icon name={iconName} className="h-20 w-20 md:h-5 md:w-5" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </nav>
    );
}
