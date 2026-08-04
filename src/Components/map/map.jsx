import React from 'react';

const Map = () => {
    
    const location = {
        name: 'BakeBerry - Kalabagan',
        address: 'Kalabagan, Dhaka, Bangladesh',
        lat: 23.7648,
        lng: 90.3865,
        zoom: 16
    };

    // Google Maps Embed URL
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Kalabagan,Dhaka,Bangladesh&center=${location.lat},${location.lng}&zoom=${location.zoom}`;

    // Alternative: OpenStreetMap URL (No API Key Required)
    const osmMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.01},${location.lat - 0.01},${location.lng + 0.01},${location.lat + 0.01}&layer=mapnik&marker=${location.lat},${location.lng}`;

    return (
        <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            {/* Map Container */}
            <div className="w-full h-full">
                {/* Google Maps Iframe */}
                <iframe
                    src={mapUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BakeBerry Location - Kalabagan, Dhaka"
                />
            </div>

            {/* Overlay with Location Info */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto bg-white/90 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-2xl border border-white/50 max-w-xs">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-800">BakeBerry</h4>
                        <p className="text-[10px] sm:text-xs text-gray-500 font-light">Kalabagan, Dhaka</p>
                        <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] sm:text-xs text-red-600 hover:text-red-700 font-medium transition-colors inline-flex items-center gap-1 mt-1"
                        >
                            Get Directions
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute right-4 top-4 flex flex-col gap-1">
                <button 
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center border border-white/50"
                    onClick={() => {
                        const iframe = document.querySelector('iframe');
                        if (iframe) {
                            // Zoom in functionality (works with Google Maps)
                            const currentZoom = parseInt(new URL(iframe.src).searchParams.get('zoom') || '16');
                            iframe.src = iframe.src.replace(/zoom=\d+/, `zoom=${Math.min(currentZoom + 1, 20)}`);
                        }
                    }}
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                    </svg>
                </button>
                <button 
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center border border-white/50"
                    onClick={() => {
                        const iframe = document.querySelector('iframe');
                        if (iframe) {
                            const currentZoom = parseInt(new URL(iframe.src).searchParams.get('zoom') || '16');
                            iframe.src = iframe.src.replace(/zoom=\d+/, `zoom=${Math.max(currentZoom - 1, 10)}`);
                        }
                    }}
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Map;