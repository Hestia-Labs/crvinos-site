

import React from 'react';

const EventsLoader: React.FC = () => {
    return (
        <div className="w-full space-y-7">
            <div className="w-full h-64 bg-gray-300 animate-pulse"></div>
            <div className="flex justify-between mt-4 border-crred border-t w-full py-4 px-2">
                <div className='space-y-3'>
                    <div className='space-y-1'>
                        <div className="h-6 bg-gray-300 animate-pulse w-1/2"></div>
                        <div className="h-4 bg-gray-300 animate-pulse w-3/4"></div>
                    </div>
                    <div className='flex justify-start items-center space-x-2'>
                        <div className="h-4 bg-gray-300 animate-pulse w-1/4"></div>
                        <div className="h-5 w-5 bg-gray-300 animate-pulse"></div>
                    </div>    
                </div>
                <div className='flex flex-col items-end space-y-1'>
                    <div className="h-6 bg-gray-300 animate-pulse w-1/4"></div>
                    <div className="h-6 bg-gray-300 animate-pulse w-1/4"></div> 
                </div>
            </div>
            <div className="flex justify-between w-full space-x-7">
                <div className="flex flex-col items-center justify-center space-y-2 w-1/2">
                    <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                    <div className="flex justify-between mt-4 border-crred border-t w-full py-4 px-2">
                        <div className='space-y-3'>
                            <div className='space-y-1'>
                                <div className="h-6 bg-gray-300 animate-pulse w-1/2"></div>
                                <div className="h-4 bg-gray-300 animate-pulse w-3/4"></div>
                            </div>
                            <div className='flex justify-start items-center space-x-2'>
                                <div className="h-4 bg-gray-300 animate-pulse w-1/4"></div>
                                <div className="h-5 w-5 bg-gray-300 animate-pulse"></div>
                            </div>    
                        </div>
                        <div className='flex flex-col items-end space-y-1'>
                            <div className="h-6 bg-gray-300 animate-pulse w-1/4"></div>
                            <div className="h-6 bg-gray-300 animate-pulse w-1/4"></div> 
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 w-1/2">
                    <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                    <div className="flex justify-between mt-4 border-crred border-t w-full py-4 px-2">
                        <div className='space-y-3'>
                            <div className='space-y-1'>
                                <div className="h-6 bg-gray-300 animate-pulse w-1/2"></div>
                                <div className="h-4 bg-gray-300 animate-pulse w-3/4"></div>
                            </div>
                            <div className='flex justify-start items-center space-x-2'>
                                <div className="h-4 bg-gray-300 animate-pulse w-1/4"></div>
                                <div className="h-5 w-5 bg-gray-300 animate-pulse"></div>
                            </div>    
                        </div>
                        <div className='flex flex-col items-end space-y-1'>
                            <div className="h-6 bg-gray-300 animate-pulse w-1/4"></div>
                            <div className="h-6 bg-gray-300 animate-pulse w-1/4"></div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsLoader;
