import React from 'react';

const EventDescLoader: React.FC = () => {
    return (
        <div className="flex flex-col w-full items-center justify-center py-12 space-y-7 animate-pulse">
            <div className="w-full flex flex-col justify-center items-center py-8 border-crred border-t-2">
                <div className="flex w-full justify-start items-start">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                        <div className="h-5 w-32 bg-gray-300 rounded"></div>
                    </div>
                </div>
                <div className="w-full h-64 md:h-100 bg-gray-300 mb-4"></div>
                <div className="flex flex-col md:flex-row gap-4 border-crred border-t mt-4 w-full py-4">
                    <div className="w-full md:w-1/2 px-2">
                        <div className="flex flex-col justify-start items-start min-w-1/2 ">
                            <div className="h-10 w-1/2 bg-gray-300 rounded mb-2"></div>
                            <div className="h-5 w-full bg-gray-300 rounded mb-4"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                            <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
                            <div className="h-5 w-2/3 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                        <div className="h-10 w-1/2 bg-gray-300 rounded mb-2"></div>
                        <div className="space-y-2">
                            <div className="h-5 w-full bg-gray-300 rounded"></div>
                            <div className="h-5 w-2/3 bg-gray-300 rounded"></div>
                            <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                            <div className="h-5 w-4/5 bg-gray-300 rounded"></div>
                            <div className="h-5 w-2/3 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 h-10 w-40 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};

export default EventDescLoader;
