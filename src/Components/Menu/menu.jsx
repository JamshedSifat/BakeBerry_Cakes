// src/components/Menu/Menu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { 
    Clock, 
    Star, 
    Plus, 
    ChevronLeft, 
    ChevronRight,
    Coffee,
    Heart,
    Award,
    Leaf,
    Wheat,
    Flame,
    Timer,
    Smile,
    Sparkles,
    ShoppingBag,
    Check
} from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import menuData from '../../../public/menuData.json';

const Menu = () => {
    const navigate = useNavigate();
    const { addToCart, cartCount } = useCart(); // Use the cart hook
    const [activeCategory, setActiveCategory] = useState('all');
    const [hoveredItem, setHoveredItem] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [addedItemId, setAddedItemId] = useState(null);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    // Ref for menu section
    const menuRef = useRef(null);

    useEffect(() => {
        setCategories(menuData.categories);
        setAllItems(menuData.menuItems);
        setFilteredItems(menuData.menuItems);
    }, []);

    useEffect(() => {
        if (activeCategory === 'all') {
            setFilteredItems(allItems);
        } else {
            setFilteredItems(allItems.filter(item => item.category === activeCategory));
        }
        setCurrentPage(1);
    }, [activeCategory, allItems]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedItems(filteredItems.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(filteredItems.length / itemsPerPage));
    }, [filteredItems, currentPage, itemsPerPage]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            if (menuRef.current) {
                const offset = 100;
                const elementPosition = menuRef.current.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            if (menuRef.current) {
                const offset = 100;
                const elementPosition = menuRef.current.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            if (menuRef.current) {
                const offset = 100;
                const elementPosition = menuRef.current.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    // Add to cart handler
    const handleAddToCart = (item) => {
        addToCart(item);
        setAddedItemId(item.id);
        setTimeout(() => setAddedItemId(null), 2000);
    };

    // Navigate to cart
    const goToCart = () => {
        navigate('/cart');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-pink-50/20 py-8 sm:py-12">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-10 sm:mb-16">
                    <div className="inline-block mb-4 sm:mb-6">
                        <span className="px-4 sm:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-red-600 bg-red-600/5 rounded-full border border-red-600/10 flex items-center gap-2">
                            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                            Premium Selection
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-3 sm:mb-4">
                        <span className="text-gray-800">Our</span>
                        <span className="text-red-600 font-medium ml-2 sm:ml-3">Menu</span>
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto font-light leading-relaxed px-4">
                        Experience the art of baking with our handcrafted selection of premium 
                        artisan breads, delicate pastries, and indulgent desserts.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`group px-3 sm:px-5 md:px-7 py-1.5 sm:py-2.5 md:py-3 rounded-full text-[10px] sm:text-sm font-medium transition-all duration-500 flex items-center gap-1 sm:gap-2 ${
                                activeCategory === category.id
                                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-2xl shadow-red-600/30 scale-105'
                                    : 'bg-white/40 backdrop-blur-sm text-gray-600 hover:bg-red-600/10 hover:text-red-600 border border-white/20'
                            }`}
                        >
                            <span>{category.icon}</span>
                            <span className="hidden xs:inline">{category.label}</span>
                            <span className="xs:hidden">{category.label.split(' ')[0]}</span>
                        </button>
                    ))}
                </div>

                {/* Menu Section with Ref */}
                <div ref={menuRef}>
                    {/* Item Count & Cart Link */}
                    <div className="flex flex-wrap items-center justify-between mb-6 sm:mb-8">
                        <p className="text-xs sm:text-sm text-gray-400 font-light flex items-center gap-2">
                            <Smile className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                            Showing <span className="text-red-600 font-medium">{filteredItems.length}</span> items
                            {filteredItems.length > itemsPerPage && (
                                <span className="text-gray-400">
                                    • Page <span className="text-red-600 font-medium">{currentPage}</span> of <span className="text-gray-600">{totalPages}</span>
                                </span>
                            )}
                        </p>
                        
                        {/* Cart Button in Menu */}
                        <button 
                            onClick={goToCart}
                            className="flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-white/40 hover:bg-red-600/10 transition-all duration-300 group"
                        >
                            <div className="relative">
                                <ShoppingBag className="w-4 h-4 text-red-600" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                                View Cart
                            </span>
                        </button>
                    </div>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {paginatedItems.map((item) => (
                            <div 
                                key={item.id}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className="group relative bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 sm:hover:-translate-y-3 border border-white/40"
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
                                        hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                        <button className="px-4 sm:px-8 py-2 sm:py-3 bg-white text-gray-900 text-xs sm:text-sm font-medium rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl">
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
                                            onClick={() => handleAddToCart(item)}
                                            disabled={addedItemId === item.id}
                                            className={`group/btn relative px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-white text-[10px] sm:text-xs md:text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden flex items-center gap-1 sm:gap-2 ${
                                                addedItemId === item.id
                                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                                    : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 hover:shadow-red-600/30'
                                            }`}
                                        >
                                            <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                                                {addedItemId === item.id ? (
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
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-12 sm:py-20">
                            <p className="text-gray-400 text-base sm:text-lg font-light">No items found in this category.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-8 sm:mt-12">
                            <button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 ${
                                    currentPage === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white/40 backdrop-blur-sm text-gray-700 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/20'
                                }`}
                            >
                                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden xs:inline">Previous</span>
                                <span className="xs:hidden">‹</span>
                            </button>

                            <div className="flex flex-wrap justify-center gap-0.5 sm:gap-1">
                                {getPageNumbers().map((page, index) => (
                                    <button
                                        key={index}
                                        onClick={() => typeof page === 'number' && goToPage(page)}
                                        disabled={page === '...'}
                                        className={`w-7 h-7 sm:w-8 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                                            page === currentPage
                                                ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-600/30 scale-105'
                                                : page === '...'
                                                ? 'text-gray-400 cursor-default'
                                                : 'bg-white/40 backdrop-blur-sm text-gray-700 hover:bg-red-600/10 hover:text-red-600'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 ${
                                    currentPage === totalPages
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white/40 backdrop-blur-sm text-gray-700 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/20'
                                }`}
                            >
                                <span className="hidden xs:inline">Next</span>
                                <span className="xs:hidden">›</span>
                                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Features Section */}
                <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    <div className="group bg-white/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center border border-white/40 hover:border-red-600/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-lg group-hover:shadow-red-600/10">
                            <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-red-600" />
                        </div>
                        <h4 className="text-xs sm:text-sm md:text-base font-medium text-gray-800 mb-0.5">Fresh Daily</h4>
                        <p className="text-[10px] sm:text-xs text-gray-400 font-light hidden sm:block">Baked fresh every morning</p>
                    </div>
                    <div className="group bg-white/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center border border-white/40 hover:border-red-600/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-lg group-hover:shadow-red-600/10">
                            <Leaf className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-red-600" />
                        </div>
                        <h4 className="text-xs sm:text-sm md:text-base font-medium text-gray-800 mb-0.5">100% Natural</h4>
                        <p className="text-[10px] sm:text-xs text-gray-400 font-light hidden sm:block">No preservatives</p>
                    </div>
                    <div className="group bg-white/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center border border-white/40 hover:border-red-600/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-lg group-hover:shadow-red-600/10">
                            <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-red-600" />
                        </div>
                        <h4 className="text-xs sm:text-sm md:text-base font-medium text-gray-800 mb-0.5">Best Prices</h4>
                        <p className="text-[10px] sm:text-xs text-gray-400 font-light hidden sm:block">Premium quality</p>
                    </div>
                    <div className="group bg-white/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center border border-white/40 hover:border-red-600/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-lg group-hover:shadow-red-600/10">
                            <Coffee className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-red-600" />
                        </div>
                        <h4 className="text-xs sm:text-sm md:text-base font-medium text-gray-800 mb-0.5">Easy Order</h4>
                        <p className="text-[10px] sm:text-xs text-gray-400 font-light hidden sm:block">Hassle-free</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Menu;