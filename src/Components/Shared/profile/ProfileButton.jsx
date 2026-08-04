import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { 
    User, 
    Package, 
    Heart, 
    Settings, 
    LogOut,
    LayoutDashboard
} from 'lucide-react';

const ProfileButton = ({ className = "" }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        console.log('Logging out...');
        setIsOpen(false);
        navigate('/login');
    };

    return (
        <div className={`relative ${className}`}>
            <button 
                onClick={handleProfileClick}
                className="hidden sm:flex btn btn-ghost btn-circle hover:bg-red-600/20 hover:scale-110 transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30"
            >
                <User className="h-5 w-5 text-red-600" />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    
                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-3xl border border-white/40 p-2 z-50">
                        <div className="p-3 border-b border-gray-200/50">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                                    JD
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800">John Doe</h4>
                                    <p className="text-xs text-gray-400">john@example.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="py-2">
                            <NavLink 
                                to="/dashboard" 
                                className="flex items-center gap-3 px-3 py-2 hover:bg-red-600/10 rounded-xl transition-colors text-gray-700 hover:text-red-600"
                                onClick={() => setIsOpen(false)}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </NavLink>
                            <NavLink 
                                to="/profile" 
                                className="flex items-center gap-3 px-3 py-2 hover:bg-red-600/10 rounded-xl transition-colors text-gray-700 hover:text-red-600"
                                onClick={() => setIsOpen(false)}
                            >
                                <User className="w-4 h-4" />
                                My Profile
                            </NavLink>
                            {/* <NavLink 
                                to="/orders" 
                                className="flex items-center gap-3 px-3 py-2 hover:bg-red-600/10 rounded-xl transition-colors text-gray-700 hover:text-red-600"
                                onClick={() => setIsOpen(false)}
                            >
                                <Package className="w-4 h-4" />
                                My Orders
                            </NavLink> */}
                            {/* <NavLink 
                                to="/wishlist" 
                                className="flex items-center gap-3 px-3 py-2 hover:bg-red-600/10 rounded-xl transition-colors text-gray-700 hover:text-red-600"
                                onClick={() => setIsOpen(false)}
                            >
                                <Heart className="w-4 h-4" />
                                Wishlist
                            </NavLink>
                            <NavLink 
                                to="/settings" 
                                className="flex items-center gap-3 px-3 py-2 hover:bg-red-600/10 rounded-xl transition-colors text-gray-700 hover:text-red-600"
                                onClick={() => setIsOpen(false)}
                            >
                                <Settings className="w-4 h-4" />
                                Settings
                            </NavLink> */}
                        </div>
                        {/* <div className="border-t border-gray-200/50 pt-2">
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-3 py-2 w-full hover:bg-red-600/10 rounded-xl transition-colors text-red-600"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div> */}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileButton;