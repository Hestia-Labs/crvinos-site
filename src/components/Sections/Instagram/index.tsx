import React from 'react';

const mockImages = [
    { id: 1, url: 'https://picsum.photos/200/300', description: 'Beautiful vineyard view' },
    { id: 2, url: 'https://picsum.photos/200/300', description: 'Tasting our finest wines' },
    { id: 3, url: 'https://picsum.photos/200/300', description: 'Sunset over the winery' },
    { id: 4, url: 'https://picsum.photos/200/300', description: 'Harvest season in full swing' },
];

const Instagram: React.FC = () => {

    return (
        <div className="p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Follow us on Instagram</h2>
                <span className="text-crred">@crvinosmx</span>
            </div>
            <div className="flex space-x-4 overflow-x-auto">
                {mockImages.map(image => (
                    <div key={image.id} className="overflow-hidden rounded-lg bg-white shadow ">
                        <div className="px-5 py-5 sm:p-6">
                            <img src={image.url} alt={`Instagram ${image.id}`} className="w-full h-auto" />
                        </div>
                        <div className="bg-gray-50 px-4 py-2 sm:px-6">
                            <p className="text-sm text-gray-700">{image.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Instagram;
