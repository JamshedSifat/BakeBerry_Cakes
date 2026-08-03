// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { 
    Menu, 
    X, 
    Search as SearchIcon, 
    ShoppingCart, 
    User, 
    Home, 
    Package, 
    Info, 
    Phone, 
    LayoutDashboard, 
    Settings, 
    LogOut,
    Heart,
    Gift
} from 'lucide-react';
import { useCart } from '../../hooks/useCart';

const Navbar = () => {
    const navigate = useNavigate();
    const { cartCount } = useCart(); // Get cart count from hook
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    // Handle cart click
    const handleCartClick = () => {
        navigate('/cart');
        setIsProfileOpen(false);
    };

    // Handle profile click
    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    // Handle logout
    const handleLogout = () => {
        console.log('Logging out...');
        setIsProfileOpen(false);
        navigate('/login');
    };

    // Handle mobile menu toggle
    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setIsSearchOpen(false);
        setIsProfileOpen(false);
    };

    // Navigation links
    const navLinks = [
        { to: '/', label: 'Home', icon: Home },
        { to: '/products', label: 'Products', icon: Package },
        { to: '/offers', label: 'Offers', icon: Gift },
        { to: '/about', label: 'About', icon: Info },
        { to: '/contact', label: 'Contact', icon: Phone },
    ];

    const mobileNavLinks = [
        ...navLinks,
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div>
            <nav className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white/40 backdrop-blur-2xl shadow-2xl border-b border-white/40' 
                    : 'bg-white/30 backdrop-blur-xl backdrop-saturate-200 shadow-2xl border-b border-white/40'
            }`}>
                
                <div className="container mx-auto px-3 sm:px-4 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        
                        {/* Left side - Toggle + Brand */}
                        <div className="flex items-center gap-2">
                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={toggleMenu}
                                className="lg:hidden btn btn-ghost btn-circle hover:bg-red-600/20 hover:scale-105 transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30"
                            >
                                {isOpen ? (
                                    <X className="h-5 w-5 text-red-600" />
                                ) : (
                                    <Menu className="h-5 w-5 text-red-600" />
                                )}
                            </button>

                            {/* Desktop Dropdown */}
                            <div className="hidden lg:block dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-red-600/20 hover:scale-105 transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30">
                                    <Menu className="h-5 w-5 text-red-600" />
                                </div>
                                <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-white/80 backdrop-blur-xl backdrop-saturate-200 rounded-2xl z-50 mt-3 w-56 p-2 shadow-2xl border border-white/40">
                                    {mobileNavLinks.map((link) => {
                                        const Icon = link.icon;
                                        return (
                                            <li key={link.to}>
                                                <NavLink 
                                                    to={link.to} 
                                                    className={({ isActive }) => 
                                                        `hover:bg-red-600/20 hover:text-red-600 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                                                            isActive ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm' : 'text-gray-700'
                                                        }`
                                                    }
                                                >
                                                    <Icon className="w-4 h-4" />
                                                    {link.label}
                                                </NavLink>
                                            </li>
                                        );
                                    })}
                                    <div className="divider my-1 border-gray-200/50"></div>
                                    <li>
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left hover:bg-red-600/20 text-red-600 rounded-lg transition-all duration-300 flex items-center gap-2 px-4 py-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Brand Name */}
                            <NavLink to="/" className="flex items-center hover:scale-105 transition-transform duration-300">
                                <span className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800'>Bake</span>
                                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 hover:text-red-700 transition-all duration-300">Berry</span>
                            </NavLink>
                        </div>
                        
                        {/* Center - Navigation Links (Desktop) */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <NavLink 
                                        key={link.to} 
                                        to={link.to} 
                                        className={({ isActive }) => 
                                            `font-medium px-3 py-2 rounded-xl transition-all duration-300 text-gray-700 flex items-center gap-2 ${
                                                isActive 
                                                ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm backdrop-blur-sm border border-white/30' 
                                                : 'hover:bg-red-600/10 hover:text-red-600 hover:backdrop-blur-sm'
                                            }`
                                        }
                                    >
                                        <Icon className="w-4 h-4" />
                                        {link.label}
                                    </NavLink>
                                );
                            })}
                        </div>
                        
                        {/* Right side - Search, Cart, Profile */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            {/* Search Component */}
                            <div className="hidden md:block">
                                <form onSubmit={handleSearch} className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Search products..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-32 lg:w-48 xl:w-64 px-4 py-2 pl-9 bg-white/20 backdrop-blur-md border-2 border-red-600/30 focus:border-red-600 text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300 rounded-xl text-sm"
                                    />
                                    <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </form>
                            </div>

                            {/* Mobile Search Toggle */}
                            <button 
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="md:hidden btn btn-ghost btn-circle hover:bg-red-600/20 hover:scale-110 transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30"
                            >
                                <SearchIcon className="h-5 w-5 text-red-600" />
                            </button>

                            {/* Cart Button with Live Count */}
                            <button 
                                onClick={handleCartClick}
                                className="btn btn-ghost btn-circle hover:bg-red-600/20 hover:scale-110 transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30 relative"
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

                            {/* Profile Button */}
                            <div className="relative">
                                <button 
                                    onClick={handleProfileClick}
                                    className="hidden sm:flex btn btn-ghost btn-circle hover:bg-red-600/20 hover:scale-110 transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30"
                                >
                                    <User className="h-5 w-5 text-red-600" />
                                </button>

                                {/* Profile Dropdown */}
                                {isProfileOpen && (
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
                                                to="/profile" 
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-red-600/10 rounded-xl transition-colors text-gray-700 hover:text-red-600"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <User className="w-4 h-4" />
                                                My Profile
                                            </NavLink>
                                            <NavLink 
                                                to="/orders" 
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-red-600/10 rounded-xl transition-colors text-gray-700 hover:text-red-600"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <Package className="w-4 h-4" />
                                                My Orders
                                            </NavLink>
                                            <NavLink 
                                                to="/wishlist" 
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-red-600/10 rounded-xl transition-colors text-gray-700 hover:text-red-600"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <Heart className="w-4 h-4" />
                                                Wishlist
                                            </NavLink>
                                            <NavLink 
                                                to="/settings" 
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-red-600/10 rounded-xl transition-colors text-gray-700 hover:text-red-600"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <Settings className="w-4 h-4" />
                                                Settings
                                            </NavLink>
                                        </div>
                                        <div className="border-t border-gray-200/50 pt-2">
                                            <button 
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-3 py-2 w-full hover:bg-red-600/10 rounded-xl transition-colors text-red-600"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Search Bar */}
            {isSearchOpen && (
                <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white/90 backdrop-blur-2xl p-4 shadow-2xl border-b border-white/40 animate-slide-down">
                    <form onSubmit={handleSearch} className="relative">
                        <input 
                            type="text" 
                            placeholder="Search for products..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 pl-10 bg-white/20 backdrop-blur-md border-2 border-red-600/30 focus:border-red-600 rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300"
                            autoFocus
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <button 
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                            Search
                        </button>
                    </form>
                </div>
            )}

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={toggleMenu}
                ></div>
            )}

            {/* Mobile Menu */}
            <div className={`lg:hidden fixed top-16 left-0 right-0 z-40 transition-all duration-300 transform ${
                isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}>
                <div className="bg-white/80 backdrop-blur-2xl shadow-2xl border-b border-white/40 p-4 mx-3 rounded-2xl max-h-[calc(100vh-80px)] overflow-y-auto">
                    <ul className="space-y-1">
                        {mobileNavLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <li key={link.to}>
                                    <NavLink 
                                        to={link.to} 
                                        onClick={toggleMenu}
                                        className={({ isActive }) => 
                                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                                isActive 
                                                ? 'bg-red-600/20 text-red-600 font-semibold' 
                                                : 'text-gray-700 hover:bg-red-600/10 hover:text-red-600'
                                            }`
                                        }
                                    >
                                        <Icon className="w-5 h-5" />
                                        {link.label}
                                    </NavLink>
                                </li>
                            );
                        })}
                        <div className="divider my-2 border-gray-200/50"></div>
                        <li>
                            <button 
                                onClick={() => {
                                    handleLogout();
                                    toggleMenu();
                                }}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-red-600 hover:bg-red-600/10 w-full"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <style>{`
                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Navbar;