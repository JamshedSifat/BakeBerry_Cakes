import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router';
import { 
    Menu, 
    X, 
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
import MobileSearchToggle from '../Shared/MobileSearchToggle';
import Search from '../Shared/Search';
import CartButton from '../Shared/Cart/CartButton';
import ProfileButton from '../Shared/profile/ProfileButton';


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const navbarHeight = 80;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: elementPosition - navbarHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                const navbarHeight = 80;
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
        }
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        console.log('Logging out...');
        navigate('/login');
    };

    const navLinks = [
        { to: '/', label: 'Home', icon: Home, section: 'home' },
        { to: '/#products', label: 'Products', icon: Package, section: 'products' },
        { to: '/#offers', label: 'Offers', icon: Gift, section: 'offers' },
        { to: '/#about', label: 'About', icon: Info, section: 'about' },
        { to: '/#contact', label: 'Contact', icon: Phone, section: 'contact' },
    ];

    const mobileNavLinks = [
        ...navLinks,
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, section: null },
        { to: '/settings', label: 'Settings', icon: Settings, section: null },
    ];

    const isLinkActive = (section) => {
        if (location.pathname !== '/') return false;
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const offset = 100;
        return rect.top <= offset && rect.bottom >= offset;
    };

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
                                        if (link.section) {
                                            return (
                                                <li key={link.to}>
                                                    <button 
                                                        onClick={() => scrollToSection(link.section)}
                                                        className="w-full text-left hover:bg-red-600/20 hover:text-red-600 rounded-lg transition-all duration-300 flex items-center gap-2 px-4 py-2 text-gray-700"
                                                    >
                                                        <Icon className="w-4 h-4" />
                                                        {link.label}
                                                    </button>
                                                </li>
                                            );
                                        }
                                        return (
                                            <li key={link.to}>
                                                <NavLink 
                                                    to={link.to} 
                                                    className={({ isActive }) => 
                                                        `hover:bg-red-600/20 hover:text-red-600 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                                                            isActive ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm' : 'text-gray-700'
                                                        }`
                                                    }
                                                    onClick={() => setIsOpen(false)}
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
                                if (link.section) {
                                    return (
                                        <button
                                            key={link.to}
                                            onClick={() => scrollToSection(link.section)}
                                            className={`font-medium px-3 py-2 rounded-xl transition-all duration-300 text-gray-700 flex items-center gap-2 hover:bg-red-600/10 hover:text-red-600 hover:backdrop-blur-sm ${
                                                location.pathname === '/' && isLinkActive(link.section)
                                                    ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm backdrop-blur-sm border border-white/30'
                                                    : ''
                                            }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {link.label}
                                        </button>
                                    );
                                }
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
                            {/* Desktop Search */}
                            <div className="hidden md:block">
                                <Search variant="compact" />
                            </div>

                            {/* Mobile Search Toggle */}
                            <MobileSearchToggle />

                            {/* Cart Button */}
                            <CartButton />

                            {/* Profile Button */}
                            <ProfileButton />
                        </div>
                    </div>
                </div>
            </nav>

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
                            if (link.section) {
                                return (
                                    <li key={link.to}>
                                        <button 
                                            onClick={() => {
                                                scrollToSection(link.section);
                                                setIsOpen(false);
                                            }}
                                            className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-700 hover:bg-red-600/10 hover:text-red-600"
                                        >
                                            <Icon className="w-5 h-5" />
                                            {link.label}
                                        </button>
                                    </li>
                                );
                            }
                            return (
                                <li key={link.to}>
                                    <NavLink 
                                        to={link.to} 
                                        onClick={() => setIsOpen(false)}
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
                                    setIsOpen(false);
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
        </div>
    );
};

export default Navbar;