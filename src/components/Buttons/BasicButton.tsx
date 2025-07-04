'use client';
import React from 'react';
import clsx from 'clsx';
import TransitionLink from '@/components/TransitionLink';

interface BasicButtonProps {
    variant: 'transparent' | 'bg-back' | 'bg-crred' | 'main' | 'cart' | 'transparent-foot' | 'bg-gray-300';
    sizex?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge' | 'xxxxlarge';
    sizey?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge' | 'xxxxlarge';
    children: React.ReactNode;
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    disabled?: boolean;
    link?: string;
    type?: 'button' | 'submit' | 'reset';
    animationDuration?: number;
    LinkComponent?: React.ComponentType<any>; // Custom Link component to use
}

const BasicButton: React.FC<BasicButtonProps> = ({ 
    variant, 
    sizex = 'medium', 
    sizey = 'medium', 
    children, 
    onClick, 
    className = '', 
    disabled = false, 
    link,
    type = 'button',
    animationDuration = 1.5,
    LinkComponent = TransitionLink
}) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            if (type !== 'submit' && type !== 'reset' && event) {
                event.preventDefault();
            }
            onClick(event);
        }
    };

    const sizeClassName = clsx({
        'px-4': sizex === 'small',
        'px-6': sizex === 'medium',
        'px-9': sizex === 'large',
        'px-12': sizex === 'xlarge',
        'px-16': sizex === 'xxlarge',
        'px-20': sizex === 'xxxlarge',
        'px-24': sizex === 'xxxxlarge',
        'py-2': sizey === 'small',
        'py-3': sizey === 'medium',
        'py-4': sizey === 'large',
        'py-5': sizey === 'xlarge',
        'py-6': sizey === 'xxlarge',
        'py-7': sizey === 'xxxlarge',
        'py-8': sizey === 'xxxxlarge',
    });

    const baseClassName = clsx(
        'rounded-full transition-all duration-300 ease-in-out text-center',
        {
            'bg-transparent text-crred hover:bg-crred hover:text-back': variant === 'transparent',
            'bg-transparent text-back hover:bg-back-75 hover:text-accred': variant === 'transparent-foot',
            'bg-transparent text-crred hover:bg-crred-75 hover:text-back': variant === 'cart',
            'bg-back text-crred hover:bg-transparent hover:text-back': variant === 'bg-back',
            'bg-back text-crred hover:bg-crred hover:text-back': variant === 'main',
            'bg-crred text-back hover:bg-back hover:text-crred': variant === 'bg-crred',
            'bg-gray-300 text-black hover:bg-gray-400 hover:text-white': variant === 'bg-gray-300',  
            'opacity-50 cursor-not-allowed': disabled,
        },
        sizeClassName,
        className
    );

    if (link && !disabled) {
        // Use the provided LinkComponent (defaults to TransitionLink)
        return (
            <LinkComponent 
                href={link} 
                className={baseClassName}
            >
                {children}
            </LinkComponent>
        );
    }

    return (
        <button type={type} className={baseClassName} onClick={handleClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default BasicButton;
