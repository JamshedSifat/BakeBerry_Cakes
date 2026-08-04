// src/Components/Products/ProductDetailsModal.jsx
import React, { useState, useEffect } from 'react';
import { 
    X, 
    Star, 
    Heart, 
    Plus, 
    Minus,
    ShoppingCart,
    Award,
    Leaf,
    Wheat,
    Flame,
    Timer,
    Check,
    Truck,
    Shield,
    RefreshCw
} from 'lucide-react';

const ProductDetailsModal = ({ 
    product, 
    isOpen, 
    onClose, 
    onAddToCart 
}) => {
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    // Reset quantity when product changes
    useEffect(() => {
        setQuantity(1);
        setIsAdded(false);
        setSelectedImage(0);
    }, [product]);

    if (!product || !isOpen) return null;

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 99) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        onAddToCart({ ...product, quantity });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    // Mock additional images - in real app, you'd have these in your data
    const images = [
        product.image,
        product.image?.replace('.jpg', '-2.jpg') || product.image,
        product.image?.replace('.jpg', '-3.jpg') || product.image,
    ];

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fadeIn"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div 
                    className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-all duration-300"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Left - Image Section */}
                        <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-red-50/30 to-pink-50/30 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
                            {/* Main Image */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/50 shadow-lg">
                                <img 
                                    src={images[selectedImage] || product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                
                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.isNew && (
                                        <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg animate-pulse border border-white/20 flex items-center gap-1">
                                            <Flame className="w-3 h-3" />
                                            New
                                        </span>
                                    )}
                                    {product.isVegan && (
                                        <span className="px-3 py-1 bg-emerald-600/90 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1">
                                            <Leaf className="w-3 h-3" />
                                            Vegan
                                        </span>
                                    )}
                                    {product.isGlutenFree && (
                                        <span className="px-3 py-1 bg-amber-500/90 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1">
                                            <Wheat className="w-3 h-3" />
                                            GF
                                        </span>
                                    )}
                                </div>

                                {product.badge && (
                                    <span className="absolute top-4 right-4 px-4 py-1.5 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-2xl border border-white/20 flex items-center gap-1">
                                        <Award className="w-3 h-3" />
                                        {product.badge}
                                    </span>
                                )}

                                {/* Wishlist Button */}
                                <button
                                    onClick={handleWishlist}
                                    className="absolute bottom-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20 hover:bg-red-600/40 transition-all duration-300"
                                >
                                    <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-white/70'}`} />
                                </button>
                            </div>

                            {/* Thumbnail Images */}
                            {images.length > 1 && (
                                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                                                selectedImage === index
                                                    ? 'border-red-600 shadow-lg shadow-red-600/20'
                                                    : 'border-transparent hover:border-gray-300'
                                            }`}
                                        >
                                            <img 
                                                src={img} 
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right - Details Section */}
                        <div className="p-6 sm:p-8 lg:p-10 flex flex-col">
                            {/* Product Name & Rating */}
                            <div className="mb-4">
                                <h2 className="text-2xl sm:text-3xl font-medium text-gray-800 mb-2">
                                    {product.name}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                                        <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                                    </div>
                                    <span className="text-sm text-gray-400">•</span>
                                    <div className="flex items-center gap-1 text-sm text-gray-400">
                                        <Timer className="w-4 h-4" />
                                        <span>{product.prepTime}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-4">
                                <span className="text-3xl font-bold text-red-600">
                                    ${product.price.toFixed(2)}
                                </span>
                                {product.originalPrice && (
                                    <span className="ml-3 text-lg text-gray-400 line-through">
                                        ${product.originalPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {product.description}
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50/50 rounded-xl px-3 py-2">
                                    <Truck className="w-4 h-4 text-red-600" />
                                    <span>Free Delivery</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50/50 rounded-xl px-3 py-2">
                                    <RefreshCw className="w-4 h-4 text-red-600" />
                                    <span>Easy Returns</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50/50 rounded-xl px-3 py-2 col-span-2">
                                    <Shield className="w-4 h-4 text-red-600" />
                                    <span>100% Fresh Guarantee</span>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                <div className="flex items-center gap-2 bg-gray-100/50 rounded-xl p-1">
                                    <button
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                    >
                                        <Minus className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <span className="w-10 text-center font-medium text-gray-800">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                        className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                    >
                                        <Plus className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdded}
                                className={`w-full py-3.5 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                                    isAdded
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                        : 'bg-gradient-to-r from-red-600 to-pink-600 hover:shadow-xl hover:shadow-red-600/30 hover:scale-[1.02]'
                                }`}
                            >
                                {isAdded ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Added to Cart!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart - ${(product.price * quantity).toFixed(2)}
                                    </>
                                )}
                            </button>

                            {/* Additional Info */}
                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-400">
                                    Free delivery on orders over $50 • 30-day freshness guarantee
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.4s ease-out;
                }
            `}</style>
        </>
    );
};

export default ProductDetailsModal;