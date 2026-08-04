import React, { useState } from 'react';
import { 
    Star, 
    Plus, 
    Heart,
    Award,
    Leaf,
    Wheat,
    Flame,
    Timer,
    Check,
    Eye
} from 'lucide-react';

const ProductCard = ({ 
    item, 
    onAddToCart, 
    onQuickView,
    isAdded = false,
    className = ""
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlist = (e) => {
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 sm:hover:-translate-y-3 border border-white/40 ${className}`}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden h-48 xs:h-52 sm:h-56 md:h-64">
                <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col gap-1 sm:gap-2">
                    {item.isNew && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider rounded-full shadow-lg animate-pulse border border-white/20 flex items-center gap-1">
                            <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            New
                        </span>
                    )}
                    {item.isVegan && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-emerald-600/90 text-white text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider rounded-full shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1">
                            <Leaf className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            Vegan
                        </span>
                    )}
                    {item.isGlutenFree && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-500/90 text-white text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider rounded-full shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1">
                            <Wheat className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            GF
                        </span>
                    )}
                </div>

                {item.badge && (
                    <span className="absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-4 py-0.5 sm:py-1.5 bg-gradient-to-r from-red-600 to-pink-600 text-white text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider rounded-full shadow-2xl border border-white/20 flex items-center gap-1">
                        <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {item.badge}
                    </span>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className="absolute top-2 sm:top-4 right-16 sm:right-20 p-1.5 sm:p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20 hover:bg-red-600/40 transition-all duration-300"
                >
                    <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-white/70'}`} />
                </button>

                {/* Prep Time */}
                <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/40 backdrop-blur-md px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 sm:gap-2 border border-white/10">
                    <Timer className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white/70" />
                    <span className="text-white/80 text-[8px] sm:text-[10px] font-medium">{item.prepTime}</span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/40 backdrop-blur-md px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 sm:gap-2 border border-white/10">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-[10px] sm:text-xs font-medium">{item.rating}</span>
                    <span className="text-white/50 text-[8px] sm:text-xs">({item.reviews})</span>
                </div>

                {/* Quick View Overlay */}
                <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                    <button 
                        onClick={() => onQuickView && onQuickView(item)}
                        className="px-4 sm:px-8 py-2 sm:py-3 bg-white text-gray-900 text-xs sm:text-sm font-medium rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-2"
                    >
                        <Eye className="w-4 h-4" />
                        Quick View
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-800 mb-0.5 sm:mb-1">
                    {item.name}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-light mb-2 sm:mb-3 md:mb-4 line-clamp-2">
                    {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">
                            ${item.price.toFixed(2)}
                        </span>
                        {item.price > 20 && (
                            <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs text-gray-400 line-through">
                                ${(item.price * 1.2).toFixed(2)}
                            </span>
                        )}
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button 
                        onClick={() => onAddToCart && onAddToCart(item)}
                        disabled={isAdded}
                        className={`group/btn relative px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-white text-[10px] sm:text-xs md:text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden flex items-center gap-1 sm:gap-2 ${
                            isAdded
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 hover:shadow-red-600/30'
                        }`}
                    >
                        <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                            {isAdded ? (
                                <>
                                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden xs:inline">Added!</span>
                                    <span className="xs:hidden">✓</span>
                                </>
                            ) : (
                                <>
                                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden xs:inline">Add</span>
                                    <span className="xs:hidden">+</span>
                                </>
                            )}
                        </span>
                        <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;