
import React from 'react';
import { useNavigate } from 'react-router';
import { 
    ShoppingCart, 
    Trash2, 
    Plus, 
    Minus,
    ArrowLeft,
    CreditCard
} from 'lucide-react';
import { useCart } from '../hooks/useCart';

const Cart = () => {
    const navigate = useNavigate();
    const { 
        cartItems, 
        updateQuantity, 
        removeFromCart, 
        clearCart,
        getTotalItems,
        getTotalPrice 
    } = useCart();

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-pink-50/20 pt-20 sm:pt-24">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center">
                        <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-medium text-gray-600 mb-2">Your cart is empty</h2>
                        <p className="text-gray-400 mb-6">Looks like you haven't added any items yet.</p>
                        <button 
                            onClick={() => navigate('/#products')}
                            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-600/20"
                        >
                            Start Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-pink-50/20 pt-20 sm:pt-24">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-xl hover:bg-white/40 transition-all duration-300"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-light text-gray-800">
                        Shopping Cart
                    </h1>
                    <span className="text-sm text-gray-400 ml-2">
                        ({totalItems} items)
                    </span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1">
                        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 overflow-hidden">
                            <div className="hidden sm:grid grid-cols-4 gap-4 p-4 bg-gray-50/50 border-b border-gray-200/50 text-sm text-gray-500 font-medium">
                                <div>Product</div>
                                <div className="text-center">Price</div>
                                <div className="text-center">Quantity</div>
                                <div className="text-right">Total</div>
                            </div>

                            {cartItems.map((item) => (
                                <div key={item.id} className="flex flex-col sm:grid sm:grid-cols-4 gap-3 p-4 border-b border-gray-200/50 hover:bg-red-50/20 transition-colors duration-200">
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-16 h-16 rounded-xl object-cover"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
                                            <p className="text-xs text-gray-400">{item.description?.substring(0, 30)}...</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center sm:block">
                                        <span className="text-red-600 font-medium">${item.price.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center gap-2 bg-white/50 rounded-xl p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                            >
                                                <Minus className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <span className="w-8 text-center font-medium text-gray-800">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                            >
                                                <Plus className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-3">
                                        <span className="font-semibold text-gray-800">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-1.5 rounded-lg hover:bg-red-100 transition-colors duration-200 text-red-500"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="p-4 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
                                <button
                                    onClick={clearCart}
                                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear Cart
                                </button>
                                <span className="text-sm text-gray-500">
                                    {totalItems} items in cart
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-80">
                        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600 border-t border-gray-200/50 pt-3">
                                    <span className="font-semibold text-gray-800">Total</span>
                                    <span className="font-bold text-red-600 text-xl">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full mt-6 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-red-600/30 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                            >
                                <CreditCard className="w-5 h-5" />
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={() => navigate('/#products')}
                                className="w-full mt-3 text-gray-500 hover:text-red-600 text-sm transition-colors duration-300"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;