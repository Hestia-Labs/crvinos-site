import React from 'react';

const NoEvents: React.FC = () => {
    return (
        <div className="w-full space-y-7 text-center text-crred">
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                No Events
            </div>
            <div className="flex justify-between mt-4 border-crred border-t w-full py-4 px-2">
                <div className='space-y-3'>
                    <div className='space-y-1'>
                        <div className="h-6 bg-gray-300 w-20 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 w-3/4 animate-pulse"></div>
                    </div>
                    <div className='flex justify-start items-center space-x-2'>
                        <div className="h-4 bg-gray-300 w-9 animate-pulse"></div>
                        <div className="h-5 w-9 bg-gray-300 animate-pulse"></div>
                    </div>
                </div>
                <div className='flex flex-col items-end space-y-1'>
                    <div className="h-6 bg-gray-300 w-1/4 animate-pulse"></div>
                    <div className="h-6 bg-gray-300 w-1/4 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default NoEvents;