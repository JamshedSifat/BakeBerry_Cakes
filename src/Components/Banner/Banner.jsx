import React from 'react';
import bgImg from '../Banner/bgImg.jpeg';

const Banner = () => {
    return (
        <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-pink-50/30">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    
                    {/* Left Side - Content */}
                    <div className="flex-1 max-w-3xl">
                        {/* Premium Badge */}
                        <div className="inline-block mb-6 animate-fade-in">
                            <span className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-600/10 backdrop-blur-sm rounded-full border border-red-600/20 shadow-lg shadow-red-600/5">
                                🎉 Premium Bakery Since 2026
                            </span>
                        </div>
                        
                        {/* Main Title */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            <span className="block text-gray-800">Freshly Baked</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-600 to-red-600 animate-gradient">
                                Goodness Awaits
                            </span>
                        </h1>
                        
                        {/* Description */}
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                            Indulge in our handcrafted pastries, artisan breads, and delectable desserts 
                            made with love using the finest ingredients. Every bite tells a story of quality 
                            and passion.
                        </p>
                        
                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 mb-10">
                            <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-2xl shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2">
                                <span>Explore Menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                            <button className="px-8 py-4 bg-white/80 backdrop-blur-md hover:bg-white text-gray-700 font-semibold rounded-2xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                                Order Now
                            </button>
                        </div>
                        
                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center gap-8">
                            {/* Rating */}
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shadow-lg">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                        +
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">4.9/5 Rating</p>
                                    <p className="text-xs text-gray-500">1,200+ reviews</p>
                                </div>
                            </div>
                            
                            {/* Divider */}
                            <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                            
                            {/* Stats */}
                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="text-2xl font-bold text-red-600">500+</p>
                                    <p className="text-xs text-gray-500">Happy Customers</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-pink-600">50+</p>
                                    <p className="text-xs text-gray-500">Products</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-red-600">10+</p>
                                    <p className="text-xs text-gray-500">Locations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side - Image with Premium Effects */}
                    <div className="flex-1 relative">
                        {/* Main Image Container */}
                        <div className="relative group">
                            {/* Glass Card Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 -rotate-3 scale-95"></div>
                            
                            {/* Image */}
                            <div className="relative rounded-3xl overflow-hidden shadow-3xl border border-white/50 transform rotate-3 group-hover:rotate-0 transition-all duration-500">
                                <img 
                                    src={bgImg} 
                                    alt="Fresh Bakery Products" 
                                    className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                
                                {/* Image Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                                
                                {/* Floating Badge on Image */}
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/50 flex items-center gap-2 animate-bounce-slow">
                                    <span className="text-2xl">⭐</span>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-800">Fresh Daily</p>
                                        <p className="text-[10px] text-gray-500">100% Natural</p>
                                    </div>
                                </div>
                                
                                {/* Floating Badge Bottom */}
                                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/50 flex items-center gap-2">
                                    <span className="text-2xl">🔥</span>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-800">Best Seller</p>
                                        <p className="text-[10px] text-gray-500">Croissant</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-600/20 rounded-full blur-2xl animate-pulse"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-600/20 rounded-full blur-2xl animate-pulse delay-700"></div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            {/* Bottom Wave Decoration */}
            <div className="absolute bottom-0 left-0 right-0 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
                    <path fill="rgba(220, 38, 38, 0.08)" d="M0,64L80,74.7C160,85,320,107,480,101.3C640,96,800,64,960,58.7C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                </svg>
            </div>
        </div>
    );
};

export default Banner;