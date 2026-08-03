import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { 
    ShoppingCart, 
    X, 
    Plus, 
    Minus, 
    Trash2,
    ArrowLeft,
    ShoppingBag,
    Heart,
    Gift,
    Truck,
    Shield,
    ChevronRight,
    AlertCircle,
    Loader
} from 'lucide-react';

const CartItems = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // Add inStock property if missing
                const cartWithStock = parsedCart.map(item => ({
                    ...item,
                    inStock: item.inStock !== undefined ? item.inStock : true
                }));
                setCartItems(cartWithStock);
            } catch (error) {
                console.error('Error loading cart:', error);
                setCartItems([]);
            }
        }
        setLoading(false);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems, loading]);

    // Update quantity
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setUpdatingId(id);
        
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
        
        setTimeout(() => setUpdatingId(null), 300);
    };

    // Remove item
    const removeItem = (id) => {
        setRemovingId(id);
        setTimeout(() => {
            setCartItems(prev => prev.filter(item => item.id !== id));
            setRemovingId(null);
        }, 300);
    };

    // Clear cart
    const clearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            setCartItems([]);
        }
    };

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // Proceed to checkout
    const handleCheckout = () => {
        if (cartItems.length === 0) return;
        navigate('/checkout', { state: { cartItems, total } });
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-white via-red-50/20 to-pink-50/20">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 font-light">Loading your cart...</p>
                </div>
            </div>
        );
    }

    // Empty cart state
    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-white via-red-50/20 to-pink-50/20">
                <div className="text-center max-w-md px-4">
                    <div className="inline-block p-6 bg-white/30 backdrop-blur-md rounded-full mb-6">
                        <ShoppingCart className="w-16 h-16 text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-light text-gray-800 mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-400 font-light mb-6">Looks like you haven't added any items to your cart yet.</p>
                    <button 
                        onClick={() => navigate('/products')}
                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30 flex items-center gap-2 mx-auto"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-pink-50/20 py-8 sm:py-12">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                    <div>
                        <button 
                            onClick={() => navigate(-1)}
                            className="text-gray-400 hover:text-red-600 transition-colors duration-300 flex items-center gap-2 text-sm font-medium mb-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Continue Shopping
                        </button>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800 flex items-center gap-3">
                            <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                            Your Cart
                            <span className="text-sm font-medium text-gray-400 bg-white/30 px-3 py-1 rounded-full">
                                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                            </span>
                        </h1>
                    </div>
                    <button 
                        onClick={clearCart}
                        className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-300 flex items-center gap-1"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear Cart
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    
                    {/* Cart Items */}
                    <div className="flex-1 space-y-3 sm:space-y-4">
                        {cartItems.map((item) => (
                            <div 
                                key={item.id}
                                className={`bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 ${
                                    removingId === item.id ? 'opacity-50 scale-95' : ''
                                }`}
                            >
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* Image */}
                                    <div className="relative w-full sm:w-24 h-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200">
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/150/ff6b6b/ffffff?text=No+Image';
                                            }}
                                        />
                                        {!item.inStock && (
                                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                                <span className="text-white text-xs font-semibold uppercase tracking-wider">Out of Stock</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                            <div>
                                                <h3 className="text-base sm:text-lg font-medium text-gray-800">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-400">{item.category}</p>
                                                {!item.inStock && (
                                                    <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                                                        <AlertCircle className="w-3 h-3" />
                                                        Currently unavailable
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg sm:text-xl font-bold text-red-600">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1 || !item.inStock || updatingId === item.id}
                                                    className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm hover:bg-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 border border-gray-200/50"
                                                >
                                                    {updatingId === item.id ? (
                                                        <Loader className="w-3.5 h-3.5 text-gray-400 animate-spin" />
                                                    ) : (
                                                        <Minus className="w-3.5 h-3.5 text-gray-600" />
                                                    )}
                                                </button>
                                                <span className="w-8 text-center font-medium text-gray-700">{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={!item.inStock || updatingId === item.id}
                                                    className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm hover:bg-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 border border-gray-200/50"
                                                >
                                                    {updatingId === item.id ? (
                                                        <Loader className="w-3.5 h-3.5 text-gray-400 animate-spin" />
                                                    ) : (
                                                        <Plus className="w-3.5 h-3.5 text-gray-600" />
                                                    )}
                                                </button>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    className="text-gray-400 hover:text-red-600 transition-colors duration-300 p-1.5 hover:bg-red-600/10 rounded-full"
                                                    onClick={() => {
                                                        // Add to wishlist functionality
                                                        alert(`Added ${item.name} to wishlist!`);
                                                    }}
                                                >
                                                    <Heart className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => removeItem(item.id)}
                                                    disabled={removingId === item.id}
                                                    className="text-gray-400 hover:text-red-600 transition-colors duration-300 p-1.5 hover:bg-red-600/10 rounded-full disabled:opacity-50"
                                                >
                                                    {removingId === item.id ? (
                                                        <Loader className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96 flex-shrink-0">
                        <div className="bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/40 shadow-lg sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="text-gray-700 font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-1">
                                        <Truck className="w-3.5 h-3.5" />
                                        Shipping
                                    </span>
                                    <span className="text-gray-700 font-medium">
                                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Tax (8%)</span>
                                    <span className="text-gray-700 font-medium">${tax.toFixed(2)}</span>
                                </div>
                                
                                {subtotal > 50 && (
                                    <div className="bg-green-500/10 rounded-xl p-2 text-center">
                                        <p className="text-xs text-green-600 font-medium flex items-center justify-center gap-1">
                                            <Gift className="w-3.5 h-3.5" />
                                            Free shipping applied!
                                        </p>
                                    </div>
                                )}
                                
                                <div className="border-t border-gray-200/50 pt-3 mt-3">
                                    <div className="flex justify-between text-base font-semibold">
                                        <span className="text-gray-800">Total</span>
                                        <span className="text-red-600">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleCheckout}
                                disabled={cartItems.length === 0}
                                className="w-full mt-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                Proceed to Checkout
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            <div className="mt-4 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                                    <Shield className="w-3.5 h-3.5" />
                                    <span>Secure checkout • 100% safe</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                                    <Gift className="w-3.5 h-3.5" />
                                    <span>Free shipping on orders over $50</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartItems;