

import React from 'react';

const InstagramLoader: React.FC = () => {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="overflow-hidden flex rounded-lg shadow-sm shadow-gray-300/50 m-1 cursor-pointer">
                    <div className="px-1 py-1 sm:p-3">
                        <div className="w-44 h-44 sm:w-48 sm:h-48 bg-gray-300 animate-pulse"></div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default InstagramLoader;
