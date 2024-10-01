'use client';
import React, { useState } from 'react';
import Icon from "../Icons";
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation'; 
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

interface NavbarProps {
    red?: boolean;
    redLogo?: boolean;
    relative?: boolean;
}

export default function Navbar({ red, redLogo, relative }: NavbarProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const textColor = red ? 'text-crred' : 'text-white';
    const borderColor = red ? 'border-crred' : 'border-white';
    const positionClass = relative ? 'relative' : 'absolute';
    const logoColorClass = redLogo ? '-red' : '';

    const navItems = [
        { name: 'Nosotros', route: "about", available: true },
        { name: 'Catálogo', route: "catalog", available: true },
        { name: 'Contacto', route: "contact", available: true },
        { name: 'Enoturismo', route: "enoturism", available: true }
    ];

    const handleNavigation = (route: string, available: boolean, event: React.MouseEvent) => {
        event.preventDefault();  
        if (available) {
            setOpen(false); 
            router.push(`/${route}`);
        }
    };

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <nav className={`w-full flex justify-between items-center px-8 py-2 bg-transparent z-50 ${positionClass} top-0 left-0 right-0 md:px-16 md:py-4`}>
            <Icon name={`CRVinos${logoColorClass}`} className="h-20 w-20 md:h-32 md:w-32" link={"/"} />
            <div className={`hidden md:flex border-b-2 ${borderColor} px-8 `}>
                <div className="flex py-2 space-x-5 ">
                    <div className='flex justify-center items-center md:text-sm text-xs space-x-8'>
                        {navItems.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: item.available ? -2 : 0 }}
                                whileTap={{ y: item.available ? -2 : 0 }}
                                initial={false}
                                animate={{ y: 0 }}
                                exit={{ y: 0 }}
                                transition={{ type: 'ease-in', stiffness: 300 }}
                                className={`${textColor} ${!item.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={(event) => handleNavigation(item.route, item.available, event)}
                            >
                                <a className={`${!item.available ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                    {item.name}
                                </a>
                                {!item.available && (
                                    <p className="text-xs text-gray-400">Próximamente</p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="md:hidden flex items-center">
                <button onClick={toggleMenu}>
                    <HiOutlineMenu className={`text-2xl ${textColor}`} />
                </button>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed top-0 right-0 w-full h-full bg-[#914E56] bg-opacity-90 flex flex-col justify-start items-end p-8 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="text-white text-3xl mb-8" onClick={toggleMenu}>
                            <HiOutlineX />
                        </button>
                        {navItems.map((item, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                className="text-white text-4xl mb-10 flex text-left"
                                onClick={(event) => handleNavigation(item.route, item.available, event)}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 * index }}
                                exit={{
                                    y: 30,
                                    opacity: 0,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
