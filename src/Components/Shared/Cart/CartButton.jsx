import React from 'react';
import { useNavigate } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';

const CartButton = ({ className = "" }) => {
    const navigate = useNavigate();
    const { cartCount } = useCart();

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <button 
            onClick={handleCartClick}
            className={`btn btn-ghost btn-circle hover:bg-red-600/20 hover:scale-110 transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30 relative ${className}`}
        >
            <div className="indicator">
                <ShoppingCart className="h-5 w-5 text-red-600" />
                {cartCount > 0 && (
                    <span className="badge badge-xs bg-red-600 text-white border-none indicator-item shadow-lg animate-pulse">
                        {cartCount}
                    </span>
                )}
            </div>
        </button>
    );
};

export default CartButton;