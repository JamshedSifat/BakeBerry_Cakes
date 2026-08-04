import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
    ChevronLeft, 
    ChevronRight,
    Smile,
    ShoppingBag,
    Filter,
    Grid,
    List
} from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import ProductCard from './ProductCard';
import ProductDetails from './ProductDetails';

const Products = ({ 
    items = [], 
    categories = [],
    activeCategory = 'all',
    onCategoryChange,
    title = "Our Products",
    subtitle = "Explore our handcrafted selection of premium artisan products.",
    itemsPerPage = 6,
    showHeader = true,
    showFilters = true,
    showPagination = true,
    className = ""
}) => {
    const navigate = useNavigate();
    const { addToCart, cartCount } = useCart();
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [addedItemId, setAddedItemId] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    useEffect(() => {
        if (activeCategory === 'all') {
            setFilteredItems(items);
        } else {
            setFilteredItems(items.filter(item => item.category === activeCategory));
        }
        setCurrentPage(1);
    }, [activeCategory, items]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedItems(filteredItems.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(filteredItems.length / itemsPerPage));
    }, [filteredItems, currentPage, itemsPerPage]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const handleAddToCart = (item) => {
        addToCart(item);
        setAddedItemId(item.id);
        setTimeout(() => setAddedItemId(null), 2000);
    };

    const handleQuickView = (item) => {
        setSelectedProduct(item);
        setIsDetailsOpen(true);
    };

    const handleCloseDetails = () => {
        setIsDetailsOpen(false);
        setSelectedProduct(null);
    };

    const goToCart = () => {
        navigate('/cart');
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br from-white via-red-50/20 to-pink-50/20 py-8 sm:py-12 ${className}`}>
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                
                {/* Header */}
                {showHeader && (
                    <div className="text-center mb-10 sm:mb-16">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-3 sm:mb-4">
                            <span className="text-gray-800">{title.split(' ')[0]}</span>
                            <span className="text-red-600 font-medium ml-2 sm:ml-3">
                                {title.split(' ').slice(1).join(' ')}
                            </span>
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto font-light leading-relaxed px-4">
                            {subtitle}
                        </p>
                    </div>
                )}

                {/* Filters */}
                {showFilters && categories.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12">
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => onCategoryChange && onCategoryChange(category.id)}
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
                        
                        <div className="flex items-center gap-2">
                            {/* View Mode Toggle */}
                            <div className="hidden sm:flex bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 p-0.5">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 rounded-lg transition-all duration-300 ${
                                        viewMode === 'grid' 
                                            ? 'bg-red-600/20 text-red-600' 
                                            : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 rounded-lg transition-all duration-300 ${
                                        viewMode === 'list' 
                                            ? 'bg-red-600/20 text-red-600' 
                                            : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>

                        </div>
                    </div>
                )}

        

                {/* Products Grid */}
                <div className={`grid ${
                    viewMode === 'grid' 
                        ? 'grid-cols-1 xs:grid-cols-2 lg:grid-cols-3' 
                        : 'grid-cols-1'
                } gap-4 sm:gap-6 lg:gap-8`}>
                    {paginatedItems.map((item) => (
                        <ProductCard
                            key={item.id}
                            item={item}
                            onAddToCart={handleAddToCart}
                            onQuickView={handleQuickView}
                            isAdded={addedItemId === item.id}
                        />
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12 sm:py-20">
                        <p className="text-gray-400 text-base sm:text-lg font-light">No items found in this category.</p>
                    </div>
                )}

                {/* Pagination */}
                {showPagination && totalPages > 1 && (
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

       
        </div>
    );
};

export default Products;